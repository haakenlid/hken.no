class BoundingBox:

    """Rectangular bounding box"""

    def __init__(self, left, top, right, bottom):
        if top > bottom or left > right:
            raise ValueError(
                'Width and height must be greater than zero')
        self.left = left
        self.top = top
        self.right = right
        self.bottom = bottom

    def __repr__(self):
        return (
            '{self.__class__.__name__}'
            '(left={self.left}, top={self.top}, '
            'right={self.right}, bottom={self.bottom})'
        ).format(self=self)

    def __add__(self, other):
        """BoundingBox containing both boxes"""
        return self.__class__(
            left=min(self.left, other.left),
            top=min(self.top, other.top),
            right=max(self.right, other.right),
            bottom=max(self.bottom, other.bottom),
        )

    def __radd__(self, other):
        return self

    def __and__(self, other):
        """Intersection"""
        return self.__class__(
            left=max(self.left, other.left),
            top=max(self.top, other.top),
            right=min(self.right, other.right),
            bottom=min(self.bottom, other.bottom),
        )

    def __contains__(self, point):
        return (self.top <= point[0] <= self.bottom and
                self.left <= point[1] <= self.right)

    def __mul__(self, factor):
        """Multiply all dimensions by factor"""
        x, y = self.center
        w, h = self.width * factor, self.height * factor
        return self.__class__(
            left=x - w / 2,
            top=y - h / 2,
            right=x + w / 2,
            bottom=y + h / 2,
        )

    @property
    def width(self):
        return self.right - self.left

    @width.setter
    def width(self, value):
        self.left, self.right = (
            self.center[0] + x * value * .5 for x in [-1, 1])

    @property
    def height(self):
        return self.bottom - self.top

    @height.setter
    def height(self, value):
        self.top, self.bottom = (
            self.center[1] + x * value * .5 for x in [-1, 1])

    @property
    def diagonal(self):
        """Length of diagonal"""
        return (self.width**2 + self.height**2)**0.5

    @property
    def ratio(self):
        """Aspect ratio"""
        return self.width / self.height

    @property
    def size(self):
        """Area of BoundingBox"""
        return self.width * self.height

    @property
    def center(self):
        """Center point of box (x, y)"""
        return (self.right + self.left) / 2, (self.bottom + self.top) / 2

    @property
    def geometry(self):
        return self.left, self.top, self.right, self.bottom

    def inside(self, other, fit=True):
        LIMIT = 1e-15  # floating point math requires some imprecision
        if not fit:
            assert self.width - other.width > -LIMIT
            assert self.height - other.height > -LIMIT

        width = min(self.width, other.width,
                    other.ratio * self.height)
        height = width * other.ratio**-1.0
        left = sorted([self.left, self.right - width,
                       other.center[0] - width / 2])[1]
        top = sorted([self.top, self.bottom - height,
                      other.center[1] - height / 2])[1]
        right = left + width
        bottom = top + height
        return self.__class__(left, top, right, bottom)

    def outside(self, other, fit=True):
        LIMIT = 1e-15  # floating point math requires some imprecision
        if not fit:
            assert other.width - self.width > -LIMIT
            assert other.height - self.height > -LIMIT

        width = max(self.width, other.width,
                    other.ratio * self.height)
        height = width * other.ratio**-1.0
        left = sorted([self.left, self.right - width,
                       other.center[0] - width / 2])[1]
        top = sorted([self.top, self.bottom - height,
                      other.center[1] - height / 2])[1]
        right = left + width
        bottom = top + height
        return self.__class__(left, top, right, bottom)


class ImageBoundingBox(BoundingBox):

    """Bounding box with absolute pixel values"""

    @classmethod
    def from_relative(cls, box, image_width, image_height, contain=True):
        if contain:
            box &= BoundingBox(0, 0, 1, 1)

        return cls(
            left=box.left * image_width,
            top=box.top * image_height,
            right=box.right * image_width,
            bottom=box.bottom * image_height,
        )

    def to_relative(self, image_width, image_height, contain=True):
        """Convert to a RelativeBoundingBox"""
        box = BoundingBox(
            left=self.left / image_width,
            top=self.top / image_height,
            right=self.right / image_width,
            bottom=self.bottom / image_height,
        )
        if contain:
            box &= BoundingBox(0, 0, 1, 1)

        return box
