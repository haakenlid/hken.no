import io
import base64
import PIL.Image
import IPython.display
import cv2
import typing
import numpy
import time
import glob
from utils import reactjs

Img = typing.Union[numpy.ndarray, str]


def timediff(start: float, stop: float) -> str:
    return '{:.0f}ms'.format(1000 * (stop - start))


def croppify_img(image_file: str, detector: typing.Any) -> str:
    st = time.time()
    features = detector.find_features(image_file)
    dt = time.time()
    rendered = reactjs.render(image_file, features)
    rt = time.time()
    return '<h2>{title}</h2><p>{info}</p>{rendered}'.format(
        title=image_file,
        info='detect: {} render: {}'.format(
            timediff(st, dt), timediff(dt, rt)),
        rendered=rendered,
    )


def croppify_all(detector, images=None):
    images = images or glob.glob('*.jpg')
    # random.shuffle(images)
    output = '\n'.join(croppify_img(img, detector) for img in images)
    return IPython.display.HTML(output)


def show_image(image: Img, width: int=800) -> str:
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


def cv_img_src(cvimg: numpy.ndarray, width: int) -> str:
    image = PIL.Image.fromarray(cvimg)
    image = image.resize((width, width * image.height // image.width))
    bytesio = io.BytesIO()
    image.save(bytesio, 'PNG')
    data = base64.encodebytes(
        bytesio.getvalue()).decode('ascii').replace('\n', '')
    return 'data:image/png/;base64,{}'.format(data)


def opencv_image(fn: str, size: typing.Optional[int]=None) -> numpy.ndarray:
    """Read image file to grayscale openCV int array.

    The OpenCV algorithms works on a two dimensional
    numpy array integers where 0 is black and 255 is
    white. Color images will be converted to grayscale.
    """
    cv_image = cv2.imread(fn)
    if size:
        dims = cv_image.shape[1::-1]
        multiplier = (size * size / (dims[0] * dims[1])) ** 0.5
        dimensions = tuple(int(round(d * multiplier)) for d in dims)
        cv_image = cv2.resize(cv_image, dimensions)
    return cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)


def test_image_render():
    imagefile = './testfixture.jpg'
    img = opencv_image(imagefile, 100)
    assert len(img.shape) == 2
    html = show_image(img).data
    assert '<img' in html
    assert 'data:' in html

    html = show_image(imagefile).data
    assert '<img' in html
    assert imagefile in html
