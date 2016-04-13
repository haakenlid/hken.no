import React from 'react'
import { connect } from 'react-redux'
import { setImgSize, addImage } from './actions'
import Previews from './Preview'
import Overlay from './Overlay'
import './style.scss'



class Canvas extends React.Component {
  constructor(props) {
    props.addImage()
    super(props)
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
    const { src } = this.props
    return (
      <div className="cropbox-wrapper" >
        <div className="masterImgWrapper">
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
        />
      </div>
    )
  }
}
Canvas.propTypes = {
  src: React.PropTypes.string.isRequired,
  setImgSize: React.PropTypes.func.isRequired,
  addImage: React.PropTypes.func.isRequired,
}
const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch, { src }) => ({
  setImgSize: size => { dispatch(setImgSize(src, size)) },
  addImage: () => { dispatch(addImage(src)) },
})
const CropBox = connect(mapStateToProps, mapDispatchToProps)(Canvas)

export default CropBox
