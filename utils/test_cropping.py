"""Tests of the cropping detectors."""

import pytest
from pathlib import Path
import json
from utils.cropengine import (FeatureDetector, Feature, KeypointDetector,
                              Cascade, get_haarcascade)
from utils.boundingbox import Box


@pytest.fixture
def fixture_image():
    imagefile = Path(__file__).parent / 'fixtureimage.jpg'
    assert imagefile.exists(), 'image not found!'
    return str(imagefile)


@pytest.fixture
def valid_cascade_file():
    return get_haarcascade('haarcascade_frontalcatface.xml')


@pytest.fixture
def invalid_cascade_file():
    return 'fixtureimage.jpg'


def test_cascade(valid_cascade_file, invalid_cascade_file):
    nose_cascade = Cascade('nose', valid_cascade_file)
    assert not nose_cascade.classifier.empty()

    with pytest.raises(RuntimeError):
        Cascade('invalid', invalid_cascade_file)


@pytest.mark.parametrize('Detector', FeatureDetector.__subclasses__())
def test_cropdetector(Detector, fixture_image):
    detector = Detector(n=10)
    features = detector.detect_features(fixture_image)
    assert len(features) >= 1
    assert 0 < sum(features).size < 1
    keys = {'x', 'y', 'width', 'height', 'label', 'weight'}
    assert set(features[0].serialize().keys()) == keys


def test_serialize_and_deserialize():
    feature = Feature(5, 'hello', 1, 2, 4, 9)
    dump = json.dumps(feature.serialize())
    data = json.loads(dump)
    assert data == {
        "label": "hello",
        "x": 1,
        "y": 2,
        "width": 3,
        "height": 7,
        "weight": 5
    }
    clone = Feature.deserialize(data)
    assert clone == feature


def test_that_keypointdetector_returns_correct_number_of_features(
        fixture_image):
    detector = KeypointDetector(n=5)
    features = detector.detect_features(fixture_image)
    assert len(features) == 5


def test_feature_operators():
    f1 = Feature(1, 'f1', 1, 2, 3, 4)
    f2 = Feature(2, 'f2', 2, 1, 4, 3)
    combined = f1 + f2
    assert combined == Box(1, 1, 4, 4)
    intersection = f1 & f2
    assert intersection == Box(2, 2, 3, 3)
    double = f1 * 2
    assert double == Feature(2, 'f1', 0, 1, 4, 5)


def test_box_operators():
    b1 = Box(1, 2, 3, 4)
    b2 = Box(2, 1, 4, 3)
    combined = b1 + b2
    assert combined == Box(1, 1, 4, 4)
    intersection = b1 & b2
    assert intersection == Box(2, 2, 3, 3)
    double = b1 * 2
    assert double == Box(0, 1, 4, 5)
