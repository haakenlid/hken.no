import subprocess
import json
import os
import pytest
from pathlib import Path
from typing import List, Dict, Callable
from utils.cropengine import Feature
import IPython.display
import functools

cwd = Path(__file__).parent


def build() -> int:
    """Build react bundles"""
    os.chdir(str(cwd))
    return subprocess.check_output(['webpack'])


def jupyter_display_html(func: Callable) -> Callable:
    """Decorator to simplify jupyter display"""

    def wrapper(*args, **kwargs):
        raw = kwargs.pop('raw', False)
        response = func(*args, **kwargs)
        if raw:
            return response
        return IPython.display.HTML(response)

    return wrapper


@jupyter_display_html
def render(src: str, features: List[Feature], preview: bool = False) -> str:
    """Render server side react app"""
    jsfile = cwd / 'cli.bundle.js'

    props = json.dumps({
        'src': src,
        'features': [f.serialize() for f in features],
        'crop': reactcrop(features),
        'showPreviews': preview,
    })
    return nodejs(str(jsfile), props)


@jupyter_display_html
def css(file_name: str = 'cli.css') -> str:
    """Get react css style tag"""
    stylesheet = (cwd / file_name).read_text()
    return f'<style>{stylesheet}</style>'


@functools.lru_cache(maxsize=None)
def nodejs(jsfile: str, props: str) -> str:
    """Communicate with nodejs over subprocess"""
    try:
        return subprocess.check_output(
            ['node', jsfile, props],
            universal_newlines=True, )
    except FileNotFoundError:
        raise RuntimeError('nodejs not installed')


def reactcrop(features: List[Feature]) -> Dict[str, List[float]]:
    features = features or [Feature(0, 'no-features', 0, 0, 1, 1)]
    x, y = features[0].center
    bounding_box = sum(features)
    x, y = features[0].center
    return {
        'h': [bounding_box.left, x, bounding_box.right],
        'v': [bounding_box.top, y, bounding_box.bottom],
    }


@pytest.fixture
def fixture_image():
    imagefile = Path(__file__).parent / 'fixtureimage.jpg'
    assert imagefile.exists(), 'image not found!'
    return str(imagefile)


def test_render_nonempty_feature_list(fixture_image):
    output = render(
        src=fixture_image,
        features=[Feature(0, 'hello', 0, 0, 1, 1)],
        raw=True)
    assert 'svg' in output


def test_render_empty_feature_list(fixture_image):
    output = render(src=fixture_image, features=[], raw=True)
    assert 'svg' in output


def test_render_html(fixture_image):
    output = render(src=fixture_image, features=[])
    assert 'svg' in output.data
