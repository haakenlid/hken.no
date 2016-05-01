from PIL import Image, ImageOps, ImageDraw
from jinja2 import Template
from io import BytesIO
import random
import base64
from .box import BoundingBox, ImageBoundingBox
import cropengine


def plot_box_on_image(image, box=None, color='white', shape='b', grid=2,
                      width=1, invert=False, antialias=2):
    width = width * antialias / 2
    if box is None:
        box = BoundingBox(0, 0, 1, 1)
    if isinstance(box, ImageBoundingBox):
        box = ImageBoundingBox.to_relative(
            box, image.width, image.height)
    overlay = Image.new(
        size=[int(dim * antialias) for dim in image.size],
        mode='RGBA', color=(0, 0, 0, 0))

    box = ImageBoundingBox.from_relative(
        box, overlay.width, overlay.height)
    draw = ImageDraw.Draw(overlay)

    def line(*args):
        draw.line(args, fill=color, width=int(2 * width))

    if 'o' in shape:
        b0 = [v - width for v in box.geometry]
        b1 = [v + width for v in box.geometry]
        draw.ellipse(b0[:2] + b1[2:], fill=color)
        draw.ellipse(b1[:2] + b0[2:], fill=(0, 0, 0, 0))

    if 'b' in shape:
        l, t, r, b = box.geometry
        line(l + width, t, r - width, t)
        line(l + width, b, r - width, b)
        line(l, t - width, l, b + width)
        line(r, t - width, r, b + width)

    if 'x' in shape:
        line(box.left, box.top, box.right, box.bottom)
        line(box.right, box.top, box.left, box.bottom)

    if '+' in shape:
        x, y = box.center
        length = 20 * antialias
        gap = 5 * antialias
        line(x - length, y, x - gap, y)
        line(x + length, y, x + gap, y)
        line(x, y - length, x, y - gap)
        line(x, y + length, x, y + gap)

    if grid and '#' in shape:
        divs = grid + 1
        dw = box.width / divs
        dh = box.height / divs
        for n in range(1, divs):
            x = box.left + n * dw
            y = box.top + n * dh
            line(box.left, y, box.right, y)
            line(x, box.top, x, box.bottom)

    overlay = overlay.resize(image.size, Image.LANCZOS)
    mask = overlay
    if invert:
        overlay = ImageOps.invert(image)
    image.paste(overlay, mask=mask)


def test_box_and_plotting(image_file):
    image = Image.open(image_file)
    image.thumbnail((600, 400))
    box = None
    plot_box_on_image(image, box, width=.8, shape='#',
                      color='white', grid=9, antialias=3)
    box = BoundingBox(.6, .1, .9, .6)
    box = ImageBoundingBox.from_relative(
        box * 2, image.width, image.height)
    plot_box_on_image(image, box, width=5, shape='ox',
                      color=(256, 0, 256, 128), antialias=4)
    box.height = box.width = 300
    plot_box_on_image(image, box * 0.5,
                      width=3, shape='o', antialias=4)
    plot_box_on_image(image, box, width=20,
                      shape='b+', invert=True)
    return image


def close_crop(image, geometry, center, shape):

    center_x = center[0] * image.width
    center_y = center[1] * image.height
    cropbox = ImageBoundingBox.from_relative(
        BoundingBox(*geometry), image.width, image.height)

    output_ratio = float(shape[0]) / shape[1]
    image_ratio = image.width / image.height

    if image_ratio > output_ratio:
        crop_to_image_width = image.height * output_ratio
    else:
        crop_to_image_width = image.width

    if cropbox.ratio > output_ratio:
        crop_to_region_width = cropbox.width
    else:
        crop_to_region_width = cropbox.height * output_ratio

    width = min(crop_to_image_width, crop_to_region_width)
    half_width = width / 2
    half_height = half_width / output_ratio

    if half_width * 2 > cropbox.width:
        ccx = [half_width, image.width -
               half_width, cropbox.center[0]]
    else:
        ccx = [cropbox.left + half_width,
               cropbox.right - half_width, center_x]

    if half_height * 2 > cropbox.height:
        ccy = [half_height, image.height -
               half_height, cropbox.center[1]]
    else:
        ccy = [cropbox.top + half_height,
               cropbox.bottom - half_height, center_y]

    center_x, center_y = sorted(ccx)[1], sorted(ccy)[1]

    box = BoundingBox(
        left=center_x - half_width,
        right=center_x + half_width,
        top=center_y - half_height,
        bottom=center_y + half_height,
    )
    return box


def image_crops_to_htmldiv(image):
    height = 150
    ratios = 0.5, 1, 2
    widths = (int(height * ratio) for ratio in ratios)
    center = image.features[0].center
    image_id = image.filename
    cropbox = sum(image.features) * 1.2
    crop_thumbs = []
    feature_thumbs = []
    for width in widths:
        shape = (width, height)
        box = close_crop(
            image=image,
            geometry=cropbox.geometry,
            center=center,
            shape=shape,
        )
        thumb = image.crop(
            [int(val) for val in box.geometry]).resize(shape)
        crop_thumbs.append(image_to_html_img(thumb))

    feature_thumb_size = [int(height * .5)] * 2
    imageclone = image.copy()
    image.thumbnail((height * 3, height * 3))
    plot_box_on_image(image, cropbox, color='white',
                      width=2, shape='b', antialias=4)
    plot_box_on_image(image, image.features[
                      0], color='yellow', width=1, shape='+', antialias=4)

    for index, feature in enumerate(image.features):
        box = ImageBoundingBox.from_relative(
            feature, imageclone.width, imageclone.height)
        thumb = imageclone.crop(
            [int(v) for v in box.geometry])
        thumb.thumbnail(feature_thumb_size)
        plot_box_on_image(
            image, feature, shape='o', antialias=4)
        plot_box_on_image(
            thumb, None, shape='+', antialias=4)
        feature_id = '{}-{}'.format(image_id, index)
        feature_thumbs.append(
            image_to_html_img(thumb, _id=feature_id))

    SNIPPET = """
    <div class='group'>
        <div class='thumbs'>
            <div class='crops'>{crops}</div>
            <div class='features'>{features}</div>
        </div>
        <div class='sourceimage'>{sourceimage}</div>
    </div>
    """

    sourceimage = image_to_html_img(image, _id=image_id)
    html = SNIPPET.format(
        crops=''.join(crop_thumbs),
        features=''.join(feature_thumbs),
        sourceimage=sourceimage,
    )
    return html


def image_to_html_img(image, _id=None, style={}):
    attrs = {}
    if style:
        attrs['style'] = '"{}"'.format(
            ';'.join('{}: {}'.format(key, value) for
                     key, value in style.items()))
    if _id:
        attrs['id'] = _id
        attrs['title'] = _id
    attrs['src'] = image_to_data_uri(image)
    html = '<img {} />'.format(
        ' '.join('{}={}'.format(k, v) for k, v in attrs.items()))
    return html


def image_to_data_uri(pil_image, file_format='jpeg'):
    blob = BytesIO()
    pil_image.convert('RGB').save(blob, file_format)
    data = base64.encodebytes(blob.getvalue()).decode(
        'ascii').replace('\n', '')
    return 'data:image/{0}/;base64,{1}'.format(file_format, data)


def image_crop_html(image, features):
    SNIPPET = """
    <div class='group'>
        <div class='thumbs'>
            <div class='crops'>
            {% for crop in crops %}
                <div class='imagecontainer'>
                    <img class='crop'
                         src='{{ uri(crop.image) }}'
                         title='{{ crop.title }}' />
                </div>
            {% endfor %}
            </div>
            <div class='features'>
            {% for feature in features %}
                <div class='imagecontainer'>
                    <img class='feature'
                         src='{{ uri(feature.image) }}'
                         title='{{ feature.title }}' />
                </div>
            {% endfor %}
            </div>
        </div>
        <div class='sourceimage'>
            <div class='imagecontainer'>
                <img src='{{ uri(image) }}' />
            </div>
        </div>
    </div>
    """
    template = Template(SNIPPET)

    height = 200
    ratios = 0.5, 1.0, 2.5
    crop_center = features[0].center
    # image_id = image.filename
    cropbox = BoundingBox(0, 0, 1, 1) & (
        sum(features) * 1.2)
    crops = []
    feature_thumbs = []
    for ratio in ratios:
        width = int(height * ratio)
        shape = (width, height)
        box = close_crop(
            image, cropbox.geometry, crop_center, shape)
        geometry = [int(val) for val in box.geometry]
        thumb = image.crop(geometry).resize(shape, 2)
        crops.append({'title': shape, 'image': thumb, })

    for index, feature in enumerate(features):
        box = ImageBoundingBox.from_relative(
            feature, image.width, image.height)
        thumb = image.crop([int(v) for v in box.geometry])
        thumb.thumbnail([int(height * .6)] * 2)
        feature_thumbs.append({
            'title': index,
            'image': thumb,
        })

    html = template.render(
        image=image,
        features=feature_thumbs,
        crops=crops,
        uri=image_to_data_uri)
    return html


def main(n=10, image_files=None, random_order=False):
    resize = 1000, 1000
    crop_engine = cropengine.HybridEngine(padding=1.5)

    if random_order:
        random.shuffle(image_files)

    image_files = image_files[:n]

    images = []
    for image_file in image_files:
        image = Image.open(image_file).convert('RGB')
        image.filename = image_file
        image.thumbnail(resize)
        features = crop_engine.find_features(image_file)
        image.html = image_crop_html(image, features)
        images.append(image)

    return '\n'.join(im.html for im in images)
