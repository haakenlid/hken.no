import React from 'react'
import Redux from 'redux'
import { Provider, connect } from 'react-redux'

const PreviewImg = ({ src, crop, aspect, size }) => {
  const imgAspect = size[0] / size[1]
  const backgroundSize = imgAspect > aspect ?
    "auto 100%" : "100% auto"
    // `auto ${1/aspect/imgAspect*100}%`:
    // `${aspect/imgAspect*100}% auto`
  const style = {
    backgroundImage: `url(${src})`,
    backgroundPosition: `${100 * crop.h[1]}% ${100 * crop.v[1]}%`,
    flex: aspect,
    backgroundSize,
  }
  return (
      <div
        className = "previewImg"
        style={style}
        title= { backgroundSize }
      >
        <svg viewBox={`0 0 ${aspect} 1`} />
      </div>
    )
}

PreviewImg.propTypes = {
  src: React.PropTypes.string.isRequired,
  size: React.PropTypes.array.isRequired,
  crop: React.PropTypes.object.isRequired,
  aspect: React.PropTypes.number.isRequired,
}

export const Previews = ({ aspects = [0.5, 1, 2.5], ...props }) => (
  <div className="preview">
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

