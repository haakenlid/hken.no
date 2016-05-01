import cv2
from .box import BoundingBox, ImageBoundingBox


class BaseCropEngine:

    def __init__(self, padding=0.6):
        self.bounds = BoundingBox(0, 0, 1, 1) * padding

    @staticmethod
    def opencv_image(image_file, size, color=cv2.COLOR_BGR2GRAY):
        cvimg = cv2.imread(image_file)
        height, width = cvimg.shape[:2]
        if width > height:
            height, width = size * height // width, size
        else:
            height, width = size, size * width // height
        cvimg = cv2.resize(cvimg, (width, height))
        return cv2.cvtColor(cvimg, color)

    def find_features(self, image_file):
        return [self.bounds, self.bounds * 0.5]


class FeatureCropEngine(BaseCropEngine):

    def __init__(self, n=10, padding=1.2, size=200, extra_kwargs=None):
        self.imagesize = size
        self.padding = padding
        arguments = dict(
            nfeatures=n,
            scaleFactor=1.5,
            patchSize=self.imagesize // 10,
            edgeThreshold=self.imagesize // 10,
            WTA_K=2,
            scoreType=cv2.ORB_FAST_SCORE,
        )
        if extra_kwargs:
            arguments.update(extra_kwargs)
        self.feature_detector = cv2.ORB_create(**arguments)

    def find_features(self, image_file):
        cvimg = self.opencv_image(
            image_file, self.imagesize)
        height, width = cvimg.shape[:2]
        keypoints, desc = self.feature_detector.detectAndCompute(
            image=cvimg, mask=None)

        def keyfunc(kp):
            return kp.size * kp.response ** 2
        keypoints = sorted(
            keypoints,  key=keyfunc, reverse=True)

        boxes = []
        for keypoint in keypoints:
            radius = keypoint.size / 2
            x = keypoint.pt[0]
            y = keypoint.pt[1]
            box = ImageBoundingBox(
                left=x - radius,
                top=y - radius,
                right=x + radius,
                bottom=y + radius,
            )
            box *= self.padding
            box = box.to_relative(width, height)
            boxes.append(box)

        return boxes


class FaceCropEngine(BaseCropEngine):

    cascade_files = '/usr/share/opencv/haarcascades/haarcascade_{}.xml'
    default_classifiers = [
        'frontalface_default', 'profileface']

    def __init__(self, classifiers=None, n=100, size=400, padding=1.3):
        if classifiers is None:
            classifiers = self.default_classifiers[:]
        self.classifiers = []
        for classifier_name in classifiers:
            cascade_file = self.cascade_files.format(
                classifier_name)
            self.classifiers.append(
                cv2.CascadeClassifier(cascade_file))

        self.imagesize = size
        self.minsize = (self.imagesize // 15,
                        self.imagesize // 15)
        self.padding = padding
        self.number = n

    def find_features(self, image_file):
        cvimg = self.opencv_image(
            image_file, self.imagesize)
        height, width = cvimg.shape[:2]

        faces = []
        for classifier in self.classifiers:
            faces.extend(
                classifier.detectMultiScale(
                    cvimg,
                    minSize=self.minsize,
                    minNeighbors=8,
                ))
        boxes = []
        for l, t, w, h in faces:
            box = ImageBoundingBox(
                left=l, top=t, right=l + w, bottom=t + h)
            box *= self.padding
            box = box.to_relative(width, height)
            boxes.append(box)

        boxes = sorted(
            boxes, key=lambda b: b.size, reverse=True)
        return boxes[:self.number]


class HybridEngine(BaseCropEngine):

    def __init__(self, padding=1.3):
        self.face_engine = FaceCropEngine(padding=padding)
        self.feature_engine = FeatureCropEngine(
            padding=padding)
        self.extra_engine = FeatureCropEngine(
            n=5, padding=padding / 2)

    def find_features(self, image_file, plot=None):
        features = self.face_engine.find_features(
            image_file)
        if not features:
            return self.feature_engine.find_features(image_file)
        if sum(features).size < 0.15:
            features += self.extra_engine.find_features(
                image_file)
        return features
