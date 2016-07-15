import React from 'react'
import Wrapper from 'wrappers/jsx'
import { cropBoxReducer } from 'components/CropBox/reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { CodeBlock, CropBox, Markdown } from 'components'


const metadata = {
  title: "React Redux image cropping",
  date: "2016-04-01",
  layout: "post",
  tags: ["react.js", "svg", "react", "redux", "cropping", "images"],
}

const devTools = (typeof window === 'object' && typeof window.devToolsExtension
                  !== 'undefined') ? window.devToolsExtension() : f => f

const store = createStore(cropBoxReducer, {}, devTools)

export default class Post extends React.Component {
  static metadata() { return metadata }
  render() {
    return (
      <Provider store={ store }>
        <Wrapper {...this.props} >
          <Markdown>{`
This is the first in a series of blog entries about image cropping. The idea of
image cropping is quite simple. We cut away parts of the original image to fit
into whatever final shape we need to put it into for publication. We might also
want have the most important part of the motive fill as much of the image frame
as possible.

## Lazy cropping

The challenge is that a single source image often ends up being used in various
final shapes, and we don't want to prepare a bunch of different pre-cropped
versions of the same image. If we can determine which regions of the full image
are the most important, the final cropping can be done by a simple computer
algorithm at the point of publication. That is lazily. The point of publication
can be either in the web browser with css or javascript, in a desktop publishing
application (Adobe InDesign) or on the web server.

I call this "lazy" image cropping, because once the input parameters to the
algorithm have been provided, the algorithm works with the same parameters for
any output shape, so the final crop can be done at the latest possible time.

## Demo
This is a javascript implementation of the algorithm. Try to move or resize the
white crop box or the yellow point of interest by clicking and dragging with the
mouse. The previews below shows the final output with three different output
formats.
            `}</Markdown>
          <CropBox src="./11-NYH-nyhklarefors-06-SGS.jpg" />
<Markdown>{`
This demo is implemented with react.js using svg for the widgets and css
background properties for the previews.

## How it works
A very simple cropping algorithm would be simply to crop evenly from both sides
either horizontally or vertically until we get the final output shape. We can
improve this by providing a single point of interest (POI), and crop the image
using this as a center point if possible.

The disadvantage of this is that we end up with a very wide crop. This looks
good in a full screen or full page layout, but if the final image is smaller,
it's better to crop away empty space around the main motive.

It turns out that we can get good results by combining the point of interest
with a "crop box". Anything outside of the crop box should be cropped away
if possible. But when the output format so wide or narrow that we also have to
crop into the crop box itself, it's done in a way that always keeps the POI
inside the image frame.

## Algorithm
The algorithm itself is just some simple arithmetic. Here's the javascript
implementation that I use for this demo. This function uses a coordinate system
where the width and height is both 1. It therefore has to be wrapped in a
function that converts the relative values to the actual width and height of the
image and of the output format.

            `}</Markdown>
          <CodeBlock linenos language="javascript">{`
const closeCrop = (x, y, l, r, t, b, A) => {
    const w = r - l
    const h = b - t
    const a = w / h
    const W = 0.5 * Math.min(A, 1, a > A ? w : h * A)
    const H = W / A
    const [X, Y] = [
        W * 2 > w ?
            [W, (l + r) / 2, 1 - W] :
            [l + W, x, r - W],
        H * 2 > h ?
            [H, (t + b) / 2, 1 - H] :
            [t + H, y, b - H],
    ].map(triple => triple.sort((n, m) => n - m)[1])
    return {
        left: X - W,
        right: X + W,
        top: Y - H,
        bottom: Y + H,
    }
}
           `}</CodeBlock>
            <Markdown>{`
## What's next
In the next blog entry I'll explain the client side cropping widget in a bit more
detail. It's meant to be used in a publication workflow for photographers or art
directors.

In the third blog entry I'll give an example of how to find the initial cropping
parameters to this algorithm using computer vision to find faces and salient
features in input images. This is done server side using python and the computer
vision library OpenCV.
            `}</Markdown>
        </Wrapper>
      </Provider>
    )
  }
}

