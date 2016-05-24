# vim: set tw=60 colorcolumn=60 :

import cv2
from utils.boundingbox import Box
from typing import List, Dict, Union
from collections import OrderedDict
from numpy import ndarray as CVImage

# type annotation aliases
FileName = str


def opencv_image(fn: FileName, maxsize: int) -> CVImage:
    """ Reads image file to grayscale openCV integer array

    The OpenCV algorithms works on a two dimensional numpy
    array integers where 0 is black and 255 is white. Color
    images will be converted to grayscale.
    """
    cv_image = cv2.imread(fn)
    img_h, img_w = cv_image.shape[:2]
    if img_w > img_h:
        dimensions = maxsize, maxsize * img_h // img_w
    else:
        dimensions = maxsize * img_w // img_h, maxsize
    cv_image = cv2.resize(cv_image, dimensions)
    return cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)


def normalize_box(box: Box, img_w: int, img_h: int) -> Box:
    """ Converts a Box to a relative coordinate system.

    The input box, width and height are the actual pixel
    values of the input image. The output will be in a
    normalized coordinate system where the image width and
    height are both 1. Any part of the Box that overflows
    the image frame is truncated. """
    return Box(0, 0, 1, 1) & Box(
        left=box.left / img_w,
        top=box.top / img_h,
        right=box.right / img_w,
        bottom=box.bottom / img_h,
    )


class Feature(Box):
    """Salient feature in an image"""

    def __init__(self, value: float,
                 className: str, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.value = value
        self.className = className

    def serialize(self) -> Dict[str, Union[str, float]]:
        """Create a dictionary with the properties
        needed to visualize the feature"""

        return OrderedDict([
            ('className', self.className),
            ('x', round(self.left, 3)),
            ('y', round(self.top, 3)),
            ('width', round(self.width, 3)),
            ('height', round(self.height, 3)),
            ('value', round(self.value, 3)),
        ])


class BaseCropEngine:

    def __init__(self, padding: float=0.6) -> None:
        self.padding = padding

    def find_features(self, fn: FileName) -> List[Feature]:
        """ Finds the most salient features of the image """
        box = Box(0, 0, 1, 1) * self.padding
        middle = Feature(1, 'base', **box.geometry)
        return [middle]


class KeypointCropEngine(BaseCropEngine):

    def __init__(self, n: int=10, imgsize: int=200,
                 padding: float=1.0, **kwargs) -> None:
        self.imagesize = imgsize
        self.padding = padding
        self.number = n
        arguments = dict(
            nfeatures=self.number,
            scaleFactor=1.5,
            patchSize=self.imagesize // 10,
            edgeThreshold=self.imagesize // 10,
            WTA_K=2,
            scoreType=cv2.ORB_FAST_SCORE,
        )
        arguments.update(kwargs)
        self.feature_detector = cv2.ORB_create(**arguments)

    def find_features(self, fn: str) -> List[Feature]:
        features = []
        cv_image = opencv_image(fn, self.imagesize)
        img_h, img_w = cv_image.shape[:2]
        keypoints = self.feature_detector.detectAndCompute(
            image=cv_image, mask=None)[0]

        def normalize_value(
                box: Box, kp: cv2.KeyPoint) -> float:
            return 0.001 * box.size * kp.response ** 2

        for keypoint in keypoints:
            r = keypoint.size / 2
            x, y = keypoint.pt
            box = Box(
                x - r, y - r, x + r, y + r) * self.padding
            box = normalize_box(box, img_w, img_h)
            feature = Feature(
                value=normalize_value(box, keypoint),
                className='ORB keypoint',
                **box.geometry,
            )
            features.append(feature)

        features.sort(key=lambda b: -b.value)
        return features[:self.number]


class FaceCropEngine(BaseCropEngine):

    _dir = '/usr/share/opencv/haarcascades/'
    _classifiers = {
        'frontal face': {
            'file': _dir + 'haarcascade_frontalface_default.xml',
            'scale': 1.00,
        },
        'profile face': {
            'file': _dir + 'haarcascade_profileface.xml',
            'scale': 0.75,
        },
    }

    def __init__(self, padding: float=1.0, n: int=10,
                 imgsize: int=400, **kwargs) -> None:
        self.imagesize = imgsize
        self.minsize = (self.imagesize // 15,) * 2
        self.padding = padding
        self.number = n
        self.kwargs = kwargs

    def find_features(self, fn: FileName) -> List[Feature]:
        cv_image = opencv_image(fn, self.imagesize)
        img_h, img_w = cv_image.shape[:2]
        features = []
        kwargs = {
            "minSize": self.minsize,
            "scaleFactor": 1.05,
            "minNeighbors": 8,
        }
        kwargs.update(self.kwargs)

        def normalize_value(box: Box) -> float:
            return box.size * 200

        for name, classifier in self._classifiers.items():
            faces = cv2.CascadeClassifier(
                classifier['file']
            ).detectMultiScale(cv_image, **kwargs)

            for left, top, width, height in faces:
                right, bottom = left + width, top + height
                box = normalize_box(
                    Box(left, top, right, bottom) *
                    classifier['scale'] * self.padding,
                    img_w, img_h
                )
                features.append(
                    Feature(value=normalize_value(box),
                            className=name, **box.geometry)
                )

        features = sorted(features, key=lambda b: -b.value)
        return features[:self.number]


class HybridEngine(BaseCropEngine):

    LIMIT = 0.15

    def __init__(self, padding: float=1.3) -> None:
        self.face_engine = FaceCropEngine(padding=padding)
        self.kp_engine = KeypointCropEngine(padding=padding)
        self.extra_engine = KeypointCropEngine(
            n=5, padding=padding / 2)

    def find_features(self, fn: FileName) -> List[Feature]:
        features = self.face_engine.find_features(fn)
        if not features:
            return self.kp_engine.find_features(fn)
        if sum(features).size < self.LIMIT:
            features += self.extra_engine.find_features(fn)
        return features
