import React from 'react'
import { connect } from 'react-redux'

const calculateBackgroundSize = (crop, size, aspect) => {
  const imgAspect = size[0] / size[1]
  return imgAspect > aspect ? "auto 100%" : "100% auto"
}

const PreviewImg = ({ src, crop, size, aspect }) => {
  const style = {
    backgroundImage: `url(${src})`,
    backgroundPosition: `${100 * crop.h[1]}% ${100 * crop.v[1]}%`,
    flex: aspect,
    backgroundSize: calculateBackgroundSize(crop, size, aspect),
  }
  return (
      <div
        className = "previewImg"
        style={style}
        title= { style.backgroundSize }
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

const Previews = ({ aspects, ...props }) => (
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

