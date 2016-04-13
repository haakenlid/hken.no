import React from 'react'
import Redux from 'redux'
import { Provider, connect } from 'react-redux'
import { Previews } from './Preview'
import { Overlay } from './Overlay'
import './style.scss'

const MasterImg = ({ src, onLoad }) => (
  <img
    className = "masterImg"
    src={src}
    onLoad={onLoad}
  />
)
MasterImg.propTypes = {
  src: React.PropTypes.string.isRequired,
  onLoad: React.PropTypes.func.isRequired,
}

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      crop: props.crop,
    }
    this.imgOnLoad = this.imgOnLoad.bind(this)
    this.setCenterPoint = this.setCenterPoint.bind(this)
  }
  setCenterPoint(x, y) {
    const { h, v } = this.state.crop
    h[1] = x
    v[1] = y
    this.setState({ crop: { h, v } })
  }
  imgOnLoad(event) {
    const img = event.target
    this.setState({
      size: [img.offsetWidth, img.offsetHeight],
    })
  }

  render() {
    const { src } = this.props
    const { size, crop } = this.state
    return (
      <div className="cropbox-wrapper" >
        <div className="masterImgWrapper">
          <MasterImg
            src={src}
            crop={crop}
            onLoad={this.imgOnLoad}
          />
          <Overlay crop={crop} setCenterPoint={this.setCenterPoint} />
        </div>
        { size && <Previews src={src} crop={crop} size={size} /> }
      </div>
    )
  }
}
Canvas.propTypes = {
  src: React.PropTypes.string.isRequired,
  crop: React.PropTypes.object,
}

Canvas.defaultProps = {
  crop: { h: [0.1, 0.5, 0.9], v: [0.1, 0.4, 0.8] },
}

export default Canvas
