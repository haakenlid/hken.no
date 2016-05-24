from typing import Tuple, Dict


class Box:

    """Rectangular bounding box"""

    def __init__(self, left: float, top: float, right: float, bottom: float
                 ) -> None:
        if top > bottom or left > right:
            raise ValueError(
                'Width and height must be greater than zero')
        self.left = left
        self.top = top
        self.right = right
        self.bottom = bottom

    def __repr__(self) -> str:
        return (
            '{self.__class__.__name__}'
            '(left={self.left}, top={self.top}, '
            'right={self.right}, bottom={self.bottom})'
        ).format(self=self)

    def __add__(self, other: 'Box') -> 'Box':
        """Box containing both boxes"""
        return Box(
            left=min(self.left, other.left),
            top=min(self.top, other.top),
            right=max(self.right, other.right),
            bottom=max(self.bottom, other.bottom),
        )

    def __radd__(self, other: 'Box') -> 'Box':
        return self

    def __and__(self, other: 'Box') -> 'Box':
        """Intersection"""
        return Box(
            left=max(self.left, other.left),
            top=max(self.top, other.top),
            right=min(self.right, other.right),
            bottom=min(self.bottom, other.bottom),
        )

    def __contains__(self, point: Tuple[
                     int, float]) -> bool:
        return (self.top <= point[0] <= self.bottom and
                self.left <= point[1] <= self.right)

    def __mul__(self, factor: float) -> 'Box':
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
    def width(self) -> float:
        return self.right - self.left

    @width.setter
    def width(self, value: float) -> None:
        self.left, self.right = (
            self.center[0] + x * value * .5 for x in [-1, 1])

    @property
    def height(self) -> float:
        return self.bottom - self.top

    @height.setter
    def height(self, value: float) -> None:
        self.top, self.bottom = (
            self.center[1] + x * value * .5 for x in [-1, 1])

    @property
    def diagonal(self) -> float:
        """Length of diagonal"""
        return (self.width**2 + self.height**2)**0.5

    @property
    def ratio(self) -> float:
        """Aspect ratio"""
        return self.width / self.height

    @property
    def size(self) -> float:
        """Area of Box"""
        return self.width * self.height

    @property
    def center(self) -> Tuple[float, float]:
        """Center point of box (x, y)"""
        return self.x, self.y

    @property
    def x(self) -> float:
        return (self.left + self.right) / 2

    @property
    def y(self) -> float:
        return (self.top + self.bottom) / 2

    @property
    def geometry(self) -> Dict[str, float]:
        return {
            'left': self.left,
            'top': self.top,
            'right': self.right,
            'bottom': self.bottom,
        }
