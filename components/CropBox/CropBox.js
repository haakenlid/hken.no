import React from 'react'
import Redux from 'redux'
import { Provider, connect } from 'react-redux'
import './style.scss'


const Handle = ({ position }) => {
  const size = .1
  const props = {
    className:`handle ${position}`,
    width: size,
    height:size,
    x:0,
    y:0,
  }
  switch (position) {
    case 'left':
      props.height = 1
      break
    case 'right':
      props.height = 1
      props.x = 1 - size
      break
    case 'top':
      props.width = 1
      props.height = size
      break
    case 'bottom':
      props.width = 1
      props.y = 1 - size
      break
    default:
      break
  }
  return <rect {...props} />
}



const Overlay = ({ crop, setCenterPoint }) => {
  const [left, x, right] = crop.h
  const [top, y, bottom] = crop.v
  const boxPath = `M${left},${top}V${bottom}H${right}V${top}Z`
  const getRelativePosition = (e) => {
    const p = e.target.parentElement.getBoundingClientRect()
    return [(e.clientX - p.left) / p.width, (e.clientY - p.top) / p.height]
  }
  const onBoxClick = (e) => {
    const [x, y] = getRelativePosition(e)
    setCenterPoint(x, y)
    console.log(x,y,e)
  }

  return (
    <svg
      className="overlay"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      height="100%"
      width="100%"
    >
      <path
        className="boxOverlay"
        fillRule="evenodd"
        d={"M0,0H1V1H0Z" + boxPath}
      />
      <path
        className="boxHandle"
        d={boxPath}
        onClick={onBoxClick}
      />
      <svg
        className="handles"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        height={bottom-top}
        width={right-left}
        x={left}
        y={top}
      >
        <Handle position="left" />
        <Handle position="right" />
        <Handle position="top" />
        <Handle position="bottom" />
      </svg>
      <path
        className="centerPoint"
        d={`M0,${y}H1M${x},0V1`}
      />
    </svg>
  )
}

class MasterImg extends React.Component {
  render() {
    return (
      <img
        className = 'masterImg'
        src={this.props.src}
        onLoad={this.props.onLoad}
      />
    )
  }
}
MasterImg.propTypes = {
  src: React.PropTypes.string.isRequired,
  onLoad: React.PropTypes.func.isRequired,
}

const PreviewImg = ({ src, crop, aspect, size }) => {
  const imgAspect = size[0]/size[1]
  const backgroundSize = imgAspect > aspect ?
    "auto 100%": "100% auto"
    // `auto ${1/aspect/imgAspect*100}%`:
    // `${aspect/imgAspect*100}% auto`
    const style = {
      backgroundImage: `url(${src})`,
      backgroundPosition: `${100*crop.h[1]}% ${100*crop.v[1]}%`,
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

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      crop: props.crop,
    }
    this.imgOnLoad = this.imgOnLoad.bind(this)
    this.setCenterPoint = this.setCenterPoint.bind(this)
  }
  imgOnLoad(event) {
    const img = event.target
    this.setState({
      size: [img.offsetWidth, img.offsetHeight],
    })
  }
  setCenterPoint(x, y) {
    const {h, v} = this.state.crop
    h[1] = x
    v[1] = y
    this.setState({crop: {h, v}})
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
          <Overlay crop={ crop } setCenterPoint={this.setCenterPoint} />
        </div>
        { size && (
          <div className="preview">
            {
              [0.5, 1.0, 2.5].map((aspect,i) => (
              <PreviewImg
                key={i} src={src} crop={crop} size={size} aspect={aspect}
              />))
            }
          </div>
          )
        }
      </div>
    )
  }
}
Canvas.propTypes = {
  src: React.PropTypes.string.isRequired,
  crop: React.PropTypes.object,
}

Canvas.defaultProps = {
  crop: {h:[.1, .5, .9], v:[.1, .4, .8]}
}

export default Canvas
