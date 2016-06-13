import subprocess
import json
import os
from typing import List, Dict
from utils.cropengine import Feature
import IPython.display
import functools

cwd = os.path.dirname(os.path.realpath(__file__))


def build() -> int:
    """Build react bundles"""
    os.chdir(cwd)
    return subprocess.check_output(['webpack'])


def jupyter_display_html(func):
    """Decorator to simplify jupyter display"""
    def wrapper(*args, **kwargs):
        raw = kwargs.pop('raw', False)
        response = func(*args, **kwargs)
        if raw:
            return response
        return IPython.display.HTML(response)
    return wrapper


@jupyter_display_html
def render(src: str, features: List[Feature], js: str='cli.bundle.js') -> str:
    """Render server side react app"""
    jsfile = os.path.join(cwd, js)

    props = json.dumps({
        'src': src,
        'features': [f.serialize() for f in features],
        'crop': reactcrop(features),
    })
    return nodejs(jsfile, props)


@jupyter_display_html
def css(file_name: str='cli.css') -> str:
    """Get react css style tag"""
    with open(os.path.join(cwd, file_name)) as fp:
        return '<style>{}</style>'.format(fp.read())


@functools.lru_cache(maxsize=None)
def nodejs(jsfile: str, props: str) -> str:
    """Communicate with nodejs over subprocess"""
    return subprocess.check_output(
        ['node', jsfile, props],
        universal_newlines=True,
    )


def reactcrop(features: List[Feature]) -> Dict[str, List[float]]:
    features = features or [Feature(0, 'no-features', 0, 0, 1, 1)]
    x, y = features[0].center
    bounding_box = sum(features)
    x, y = features[0].center
    return {
        'h': [bounding_box.left, x, bounding_box.right],
        'v': [bounding_box.top, y, bounding_box.bottom],
    }

# pytest


def test_render_nonempty_feature_list():
    output = render(src='testfixture.jpg', features=[
        Feature(0, 'hello', 0, 0, 1, 1)], raw=True)
    assert 'svg' in output


def test_render_empty_feature_list():
    output = render(src='testfixture.jpg', features=[], raw=True)
    assert 'svg' in output


def test_render_html():
    output = render(src='testfixture.jpg', features=[])
    assert 'svg' in output.data
