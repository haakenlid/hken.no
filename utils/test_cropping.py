"""Tests of the cropping detectors."""

import pytest
import json
from utils.cropengine import (
    MockFeatureDetector, FaceDetector,
    KeypointDetector, HybridDetector, Feature)
from utils.boundingbox import Box

detectors = MockFeatureDetector, FaceDetector, KeypointDetector, HybridDetector


@pytest.fixture
def testimage():
    return 'testfixture.jpg'


@pytest.mark.parametrize('Detector', detectors)
def test_cropdetector(Detector, testimage):
    detector = Detector()
    features = detector.detect_features(testimage)
    assert len(features) >= 1
    assert 0 < sum(features).size < 1
    keys = {'x', 'y', 'width', 'height', 'label', 'weight'}
    assert set(features[0].serialize().keys()) == keys


def test_serialize_and_deserialize():
    feature = Feature(5, 'hello', 1, 2, 4, 9)
    dump = json.dumps(feature.serialize())
    data = json.loads(dump)
    assert data == {
        "label": "hello", "x": 1, "y": 2,
        "width": 3, "height": 7, "weight": 5
    }
    clone = Feature.deserialize(data)
    assert clone == feature


def test_that_keypointdetector_returns_correct_number_of_features(testimage):
    number = 3
    detector = KeypointDetector(n=number)
    features = detector.detect_features(testimage)
    assert len(features) == number


def test_feature_operators():
    f1 = Feature(1, 'f1', 1, 2, 3, 4)
    f2 = Feature(2, 'f2', 2, 1, 4, 3)
    combined = f1 + f2
    assert combined == Box(1, 1, 4, 4)
    intersection = f1 & f2
    assert intersection == Box(2, 2, 3, 3)
    double = f1 * 2
    assert double == Feature(2, 'f1', 0, 1, 4, 5)
