import subprocess
import json
import os
from typing import List, Dict
from utils.cropengine import Feature

cwd = os.path.dirname(os.path.realpath(__file__))

def build() -> int:
    """Build react bundles"""
    os.chdir(cwd)
    return subprocess.check_output(['webpack'])


def render(src: str, features: List[
           Feature], js: str='cli.bundle.js') -> str:
    """Render server side react app"""
    jsfile = os.path.join(cwd, js)
    props = json.dumps({
        'src': src,
        'features': [f.serialize() for f in features],
        'crop': reactcrop(features),
    })
    return subprocess.check_output(
        ['node', jsfile, props],
        universal_newlines=True,
    )


def css(file_name='cli.css'):
    """Get react css style tag"""
    with open(os.path.join(cwd, file_name)) as fp:
        return '<style>{}</style>'.format(fp.read())


def reactcrop(
        features: List[Feature]) -> Dict[str, List[float]]:
    bounding_box = sum(features)
    x, y = features[0].center
    return {
        'h': [bounding_box.left, x, bounding_box.right],
        'v': [bounding_box.top, y, bounding_box.bottom],
    }
