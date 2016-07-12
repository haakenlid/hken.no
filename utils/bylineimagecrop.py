import PIL
import io
import glob
import base64
import random
import IPython

from utils.cropengine import FaceDetector, Feature


def image_to_data(image, width=200):
    image = image.resize((width, width * image.height // image.width))
    bytesio = io.BytesIO()
    image.save(bytesio, 'PNG')
    data = base64.encodebytes(
        bytesio.getvalue()).decode('ascii').replace('\n', '')
    return 'data:image/png/;base64,{}'.format(data)


def img_element(src, width: int=100, title='img') -> str:
    style = "display:inline;margin:2px;"
    return '<img title="{}" style="{}" src="{}" width={}px />'.format(
        title, style, src, width)


def show_tryner(n=200):
    portrait_detector = FaceDetector(n=1, imagesize=200)
    portrait_detector._cascades = portrait_detector._cascades[:2]
    doc = ''
    tryner = glob.glob('/srv/fotoarkiv_universitas/byline-photo/*.jpg')
    random.shuffle(tryner)
    for tryne in tryner[:n]:
        features = portrait_detector.detect_features(tryne)
        if features:
            f = features[0]
        else:
            f = Feature(1, 'nope', 0, 0, 1, 1)
        image = PIL.Image.open(tryne)
        box = (
            f.left * image.width,
            f.top * image.height,
            f.right * image.width,
            f.bottom * image.height,
        )
        image = image.crop(box)
        data = image_to_data(image)
        title = '{}\n{}'.format(f.label, tryne.split('/')[-1])
        doc += img_element(data, title=title)

    return IPython.display.HTML(doc)
