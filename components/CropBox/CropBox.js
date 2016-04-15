import React from 'react'
import { connect } from 'react-redux'
import { setImgSize, addImage } from './actions'
import Previews from './Preview'
import Overlay from './Overlay'
import './cropbox.scss'


class Canvas extends React.Component {
  constructor(props) {
    super(props)
    props.addImage()
    this.imgOnLoad = this.imgOnLoad.bind(this)
    this.getRelativePosition = this.getRelativePosition.bind(this)
  }
  getRelativePosition(e) {
    const img = this.refs.masterImg.getBoundingClientRect()
    return [
      (e.clientX - img.left) / img.width,
      (e.clientY - img.top) / img.height,
    ].map(num => Math.max(0, Math.min(num, 1)))
  }
  imgOnLoad(e) {
    const img = e.target
    this.props.setImgSize([img.offsetWidth, img.offsetHeight])
  }
  render() {
    const { src, aspects } = this.props
    return (
      <div className="cropboxWrapper" >
        <div style={{ position: 'relative' }} className="masterImgWrapper">
          <img
            ref="masterImg"
            className = "masterImg"
            onLoad={this.imgOnLoad}
            src={src}
          />
          <Overlay
            getRelativePosition={this.getRelativePosition}
            src={src}
          />
        </div>
        <Previews
          src={src}
          aspects={aspects}
        />
      </div>
    )
  }
}
Canvas.propTypes = {
  src: React.PropTypes.string.isRequired,
  aspects: React.PropTypes.array,
  setImgSize: React.PropTypes.func.isRequired,
  addImage: React.PropTypes.func.isRequired,
}
const mapDispatchToProps = (dispatch, { src }) => ({
  setImgSize: size => dispatch(setImgSize(src, size)),
  addImage: () => dispatch(addImage(src)),
})
const CropBox = connect(null, mapDispatchToProps)(Canvas)

export default CropBox
