"""
tests of the cropping engines.
"""
import pytest
import json
# import os
from .cropengine import (
    BaseCropEngine, FaceCropEngine, KeypointCropEngine, HybridEngine)


@pytest.fixture
def testimage():
    return 'testfixture.jpg'


engines = BaseCropEngine, FaceCropEngine, KeypointCropEngine, HybridEngine


@pytest.mark.parametrize('Engine', engines)
def test_cropengine(Engine, testimage):
    engine = Engine()
    features = engine.find_features(testimage)
    assert len(features) >= 1
    size = sum(features).size
    assert size > 0
    assert size < 1
    data = features[0].serialize()
    keys = 'x', 'y', 'width', 'height', 'className', 'value'
    assert set(data.keys()) == set(keys)
