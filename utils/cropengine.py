# vim: set tw=60 colorcolumn=60 :

import cv2
import abc
import os
from utils.boundingbox import Box
from typing import List, Mapping, Union
from collections import OrderedDict
from numpy import ndarray as CVImage

# type annotation aliases
FileName = str


class Feature(Box):

    """Rectangular region containing salient image feature"""

    def __init__(self, weight: float, label: str,
                 *args, **kwargs) -> None:
        self.weight = weight
        self.label = label
        super().__init__(*args, **kwargs)

    def __lt__(self, other):
        """Less than comparison"""
        # self < other
        # this enables sorting
        return self.weight < other.weight

    def __mul__(self, factor: float) -> 'Feature':
        box = super().__mul__(factor)
        return self.__class__(
            label=self.label,
            weight=self.weight * factor,
            **box.__dict__,
        )

    def serialize(self, precision: int=3) \
            -> Mapping[str, Union[str, float]]:
        """Build a json serializable dictionary with the
        attributes relevant for client side visualisation of
        the Feature."""

        def floatformat(f):
            return round(f, precision)

        return OrderedDict([
            ('label', self.label),
            ('x', floatformat(self.left)),
            ('y', floatformat(self.top)),
            ('width', floatformat(self.width)),
            ('height', floatformat(self.height)),
            ('weight', floatformat(self.weight)),
        ])

    @classmethod
    def deserialize(cls, data: dict) -> 'Feature':
        left = float(data.get('x'))
        top = float(data.get('y'))
        bottom = top + float(data.get('height'))
        right = left + float(data.get('width'))
        return cls(
            label=data.get('label', 'feature'),
            weight=data.get('weight', 0),
            left=left, top=top, bottom=bottom, right=right
        )


class FeatureDetector(abc.ABC):

    @abc.abstractmethod
    def detect_features(self, fn: FileName) -> List[Feature]:
        """Find the most salient features of the image."""
        ...

    @staticmethod
    def _opencv_image(fn: str, resize: int=0) -> CVImage:
        """Read image file to grayscale openCV int array.

        The OpenCV algorithms works on a two dimensional
        numpy array integers where 0 is black and 255 is
        white. Color images will be converted to grayscale.
        """
        cv_image = cv2.imread(fn)
        if resize > 0:
            w, h = cv_image.shape[1::-1]  # type: int, int
            multiplier = (resize ** 2 / (w * h)) ** 0.5
            dimensions = tuple(
                int(round(d * multiplier)) for d in (w, h))
            cv_image = cv2.resize(
                cv_image, dimensions,
                interpolation=cv2.INTER_AREA)
        return cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)

    @staticmethod
    def _normalize_box(box: Box, img_w: int, img_h: int) -> Box:
        """Convert a Box to a relative coordinate system.

        The input box, width and height are the actual pixel
        values of the input image. The output will be in a
        normalized coordinate system where the image width
        and height are both 1. Any part of the Box that
        overflows the image frame is truncated."""
        return Box(0, 0, 1, 1) & Box(
            left=box.left / img_w,
            top=box.top / img_h,
            right=box.right / img_w,
            bottom=box.bottom / img_h,
        )


class MockFeatureDetector(FeatureDetector):

    """Example feature detector interface."""

    def detect_features(self, fn: FileName) -> List[Feature]:
        """Find the most salient features of the image."""
        cv_image = self._opencv_image(fn, 100)
        img_h, img_w = cv_image.shape[:2]  # type: int, int
        middle = Feature(1, 'keypoint', 0, 0, 1, 1)
        middle.width = 0.5
        middle.height = middle.width * img_w / img_h
        return [middle]


class KeypointDetector(FeatureDetector):

    """Feature detector using OpenCVs ORB algorithm"""

    CSS_CLASS_NAME = 'ORB keypoint'

    def __init__(self, n: int=10, imagesize: int=200,
                 padding: float=1.0, **kwargs) -> None:
        self._imagesize = imagesize
        self._padding = padding
        arguments = dict(
            nfeatures=n + 1,
            scaleFactor=1.5,
            patchSize=self._imagesize // 10,
            edgeThreshold=self._imagesize // 10,
            WTA_K=2,
            scoreType=cv2.ORB_FAST_SCORE,
        )
        arguments.update(kwargs)
        self._feature_detector = cv2.ORB_create(**arguments)

    def detect_features(self, fn: str) -> List[Feature]:
        """Find interesting keypoints in the image."""
        features = []
        cv_image = self._opencv_image(fn, self._imagesize)
        img_h, img_w = cv_image.shape[:2]  # type: int, int
        keypoints = self._feature_detector.detectAndCompute(
            image=cv_image, mask=None)[0]  # type: list

        def normalize_weight(box: Box,
                             kp: cv2.KeyPoint) -> float:
            """Calculate relative saliency weight."""
            # this is a fairly arbitrary formula
            # to extract a value that can be used
            # for comparisons and sorting.
            return 0.001 * box.size * kp.response ** 2

        for keypoint in keypoints:
            x, y = keypoint.pt  # type: float, float
            radius = keypoint.size / 2  # type: float
            rect = self._normalize_box(
                Box(
                    left=x - radius,
                    top=y - radius,
                    right=x + radius,
                    bottom=y + radius
                ) * self._padding,
                img_w, img_h,
            )
            features.append(Feature(
                label=self.CSS_CLASS_NAME,
                weight=normalize_weight(rect, keypoint),
                **rect.__dict__,
            ))

        return sorted(features, reverse=True)


class FaceDetector(FeatureDetector):

    """Face detector using OpenCVs Viola-Jones algorithm and
    and Haar cascade training data files classifying human
    frontal and profile faces."""

    _DIR = '/usr/share/opencv/haarcascades/'
    _CLASSIFIERS = {
        'frontal face': {
            'file': 'haarcascade_frontalface_default.xml',
            'multiplier': 1.00,
        },
        'alt face': {
            'file': 'haarcascade_frontalface_alt.xml',
            'multiplier': 0.90,
        },
        'profile face': {
            'file': 'haarcascade_profileface.xml',
            'multiplier': 0.75,
        },
    }  # type: Mapping[str, dict]

    def __init__(self, padding: float=1.2, n: int=10,
                 imagesize: int=600, **kwargs) -> None:
        self._imagesize = imagesize
        minsize = max(25, imagesize // 20)
        self._minsize = (minsize, minsize)
        self._padding = padding
        self._number = n
        self._kwargs = kwargs

    def detect_features(self, fn: FileName) -> List[Feature]:
        """Find faces in the image."""
        cv_image = self._opencv_image(fn, self._imagesize)
        img_h, img_w = cv_image.shape[:2]  # type: int, int
        features = []  # type: List[Feature]
        kwargs = {
            "minSize": self._minsize,
            "scaleFactor": 1.2,
            "minNeighbors": 5,
        }
        kwargs.update(self._kwargs)

        def normalize_weight(box: Box) -> float:
            """Calculate relative saliency weight."""
            # this is a fairly arbitrary formula
            # to extract a value that can be used
            # for comparisons and sorting.
            return box.width * box.height * 200

        for name, classifier in self._CLASSIFIERS.items():
            faces = cv2.CascadeClassifier(
                os.path.join(self._DIR, classifier['file'])
            ).detectMultiScale(cv_image, **kwargs)

            for left, top, width, height in faces:
                right, bottom = left + width, top + height
                box = self._normalize_box(
                    Box(left, top, right, bottom) *
                    classifier['multiplier'] * self._padding,
                    img_w, img_h
                )
                features.append(
                    Feature(
                        weight=normalize_weight(box),
                        label=name,
                        **box.__dict__,
                    )
                )

        return sorted(features, reverse=True)[:self._number]


class HybridDetector(FeatureDetector):
    """Detector using a hybrid strategy to find salient
    features in images.

    Tries to detect_features faces first. If the faces are
    small relative to the image, will detect_features
    keypoints as well.  If no faces are detected, will fall
    back to a pure KeypointDetector."""

    BREAKPOINT = 0.15

    def __init__(self) -> None:
        self.primary_detector = FaceDetector()
        self.fallback_detector = KeypointDetector()
        self.secondary_detector = KeypointDetector(
            padding=1.0, n=8)

    def detect_features(self, fn: FileName) -> List[Feature]:
        """Find faces and/or keypoints in the image."""
        detectors = [
            self.primary_detector.detect_features,
            self.secondary_detector.detect_features,
            self.fallback_detector.detect_features,
        ]
        features = detectors[0](fn)
        if not features:
            return detectors[2](fn)
        if sum(features).size < self.BREAKPOINT:
            features += detectors[1](fn)
        return features
