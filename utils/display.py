import io
import base64
import PIL.Image
import IPython.display
import cv2
import typing
import numpy
import time
import glob
import pytest
from utils import reactjs
from utils.cropengine import FeatureDetector
from pathlib import Path

Img = typing.Union[numpy.ndarray, str]


def timediff(start: float, stop: float) -> str:
    return '{:.0f}ms'.format(1000 * (stop - start))


def croppify_img(image_file: str,
                 detector: FeatureDetector,
                 preview: bool = False) -> str:
    st = time.time()
    features = detector.detect_features(image_file)
    dt = time.time()
    rendered = reactjs.render(image_file, features, preview=preview, raw=True)
    rt = time.time()
    return '<h4>{title}</h4><p>{info}</p>{rendered}'.format(
        title=image_file,
        info='detect: {} render: {}'.format(
            timediff(st, dt), timediff(dt, rt)),
        rendered=rendered, )


def croppify_all(detector, images=None, preview: bool = False):
    images = images or glob.glob('*.jpg')
    # random.shuffle(images)
    output = '\n'.join(
        croppify_img(img, detector, preview=preview) for img in images)
    return IPython.display.HTML(output)


def show_image(image: Img, width: int = 800) -> str:
    if isinstance(image, str):
        src = image
    else:
        src = cv_img_src(image, width)
    return IPython.display.HTML(
        '<img src="{}" width={}px />'.format(src, width))

    # IPython also has an Image render type, but I have to write
    # a gatsby wrapper for that if I'm going to use it
    #
    # return IPython.display.Image(
    #     data=bytesio.getvalue(), embed=True, format='png')


def show_features(image: Img, features: list, preview=False):
    return reactjs.render(image, features, preview)


def detect_and_show(image: Img, det: FeatureDetector, preview=False):

    if isinstance(image, list):
        html = ''.join(detect_and_show(im, det, preview).data for im in image)
        return IPython.display.HTML(html)
    features = det.detect_features(image)
    return reactjs.render(image, features, preview)


def cv_img_src(cvimg: numpy.ndarray, width: int) -> str:
    image = PIL.Image.fromarray(cvimg)
    image = image.resize((width, width * image.height // image.width))
    bytesio = io.BytesIO()
    image.save(bytesio, 'PNG')
    data = base64.encodebytes(bytesio.getvalue()).decode('ascii').replace(
        '\n', '')
    return 'data:image/png/;base64,{}'.format(data)


def opencv_image(fn: str, size: typing.Optional[int] = None) -> numpy.ndarray:
    """Read image file to grayscale openCV int array.

    The OpenCV algorithms works on a two dimensional
    numpy array integers where 0 is black and 255 is
    white. Color images will be converted to grayscale.
    """
    cv_image = cv2.imread(fn)
    if size:
        dims = cv_image.shape[1::-1]
        multiplier = (size * size / (dims[0] * dims[1]))**0.5
        dimensions = tuple(int(round(d * multiplier)) for d in dims)
        cv_image = cv2.resize(cv_image, dimensions)
    return cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)


@pytest.fixture
def fixture_image():
    imagefile = Path(__file__).parent / 'fixtureimage.jpg'
    assert imagefile.exists()
    return str(imagefile)


def test_image_render(fixture_image):
    img = opencv_image(fixture_image, 100)
    assert len(img.shape) == 2
    html = show_image(img).data
    assert '<img' in html
    assert 'data:' in html

    html = show_image(fixture_image).data
    assert '<img' in html
    assert fixture_image in html
