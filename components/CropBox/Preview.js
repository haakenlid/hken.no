import React from 'react'
import { connect } from 'react-redux'
import './preview.scss'

const median = (numbers) => numbers.sort((a, b) => a - b)[1]

const closeCrop = (crop, imr, frr) => {
  const frameRatio = frr / imr
  const [x0, x1, x2] = crop.h
  const [y0, y1, y2] = crop.v
  const cropWidth = (x2 - x0)
  const cropHeight = (y2 - y0)
  const cropRatio = cropWidth / cropHeight
  const w1 = Math.min(frameRatio, 1)
  const w2 = cropRatio > frameRatio ? cropWidth : cropHeight * frameRatio
  const width = Math.min(w1, w2)
  const height = width / frameRatio
  const hw = width / 2
  const hh = height / 2

  const cx = median(hw * 2 > cropWidth ? [hw, (x0 + x2)/2, 1 - hw] : [x0 + hw, x1, x2 - hw])
  const cy = median(hh * 2 > cropHeight ? [hh, (y0 + y2)/2, 1 - hh] : [y0 + hh, y1, y2 - hh])

  return {
    left: cx - hw,
    top: cy - hh,
    right: cx + hw,
    bottom: cy + hh,
    w: width,
    h: height,
    cx,
    cy,
  }
}

const percentOf = (lower, upper, value) => (
  upper === lower ? '50%' : `${(100 * (value - lower) / (upper - lower)).toFixed(1)}%`
)

const getStyles = (src, crop, imgRatio, frameRatio) => {
  const flex = frameRatio
  const backgroundImage = `url(${src})`
  const c = closeCrop(crop, imgRatio, frameRatio)
  const backgroundPosition = [percentOf(c.w, 1, c.right), percentOf(c.h, 1, c.bottom)].join(' ')
  const backgroundSize = `${(100 / c.w).toFixed(1)}% ${(100 / c.h).toFixed(1)}%`

  return { backgroundImage, flex, backgroundPosition, backgroundSize }
}

const PreviewImg = ({ src, crop, size, aspect }) => {
  const styles = getStyles(src, crop, size[0] / size[1], aspect)
  return (
      <div
        className = "previewImg"
        style={styles}
        title={JSON.stringify(styles, null, 2)}
      >
        <svg
          style={{ display: 'block' }}
          viewBox={`0 0 ${aspect} 1`}
        />
      </div>
    )
}

PreviewImg.propTypes = {
  src: React.PropTypes.string.isRequired,
  size: React.PropTypes.array.isRequired,
  crop: React.PropTypes.object.isRequired,
  aspect: React.PropTypes.number.isRequired,
}

const Previews = ({ aspects = [1, 0.5, 3], ...props }) => (
  <div className="previewPanel">
    {
      aspects.map((aspect, i) => (
        <PreviewImg key={i} aspect={aspect} {...props} />))
    }
  </div>
)
Previews.propTypes = {
  aspects: React.PropTypes.array,
  props: React.PropTypes.object,
}

const mapStateToProps = (state, { src }) => state.images[src]

export default connect(mapStateToProps)(Previews)

