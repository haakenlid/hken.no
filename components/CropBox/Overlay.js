import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import { normalize } from './reducers'
import './overlay.scss'


const DragKing = (props) => (
  <div
    className="dragKing"
    { ...props }
  />
)

/* eslint-disable quote-props */
const cursor = {
  '1000': 'ew-resize',
  '0010': 'ew-resize',
  '0100': 'ns-resize',
  '0001': 'ns-resize',
  '1100': 'nw-resize',
  '0110': 'ne-resize',
  '0011': 'se-resize',
  '1001': 'sw-resize',
}
/* eslint-enable quote-props */

const Label = ({ items, size }) => (
  <text
    x="1" y={size * 0.6}
    textAnchor="middle"
  >
    { Object.keys(items).map((key) => (
      <tspan
        key={key}
        className={key}
        x = {1}
        dy = {size * -1.2}
        style={{ fontSize: size }}
      >
        {`${key}: ${items[key]}`}
      </tspan>
    ))}
  </text>
)
Label.propTypes = {
  items: React.PropTypes.object,
  size: React.PropTypes.number,
}

const Keypoint = () => (
  <g>
    <circle r="1" cx="1" cy="1" className="back" />
    <circle r="1" cx="1" cy="1" className="front" />
    <path
      className="cross"
      d="M0,1h0.9m0.2,0h0.9M1,0v0.9m0,0.2v0.9"
      transform="rotate(45 1 1)"
    />
  </g>
)

const Face = ({ className }) => {
  const symbol = className.includes('frontal') ?
    '#frontal-face' : '#profile-face'
  return (
    <g>
      <use xlinkHref={symbol} x="0" y="0" height="2" width="2" className="back" />
      <use xlinkHref={symbol} x="0" y="0" height="2" width="2" className="front" />
    </g>
  )
}
Face.propTypes = {
  className: React.PropTypes.string,
}

const Feature = ({ className = "", value = 0, ...props }) => (
  <svg
    className={`feature ${className}`}
    preserveAspectRatio="none"
    viewBox="0 0 2 2"
    {...props}
  >
    <Label items={{ className, value }} size={ 0.04 / props.width } />
    { className.includes('keypoint') && <Keypoint /> }
    { className.includes('face') && <Face className={className} /> }
  </svg>
)
Feature.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.number,
  width: React.PropTypes.number,
}

const Handle = ({ name, mouseDownHandler }) => {
  const handleSize = 0.1
  const mask = name.split('').map(parseFloat)
  return (
    <rect
      className={name}
      onMouseDown={mouseDownHandler(mask)}
      width = {1 - mask[0] - mask[2] + handleSize}
      height = {1 - mask[1] - mask[3] + handleSize}
      x = {mask[2] - handleSize / 2}
      y = {mask[3] - handleSize / 2}
      style={{ cursor: cursor[name] }}
    />
  )
}
Handle.propTypes = {
  name: React.PropTypes.string,
  mouseDownHandler: React.PropTypes.func,
}

let Overlay = ({
  size,
  getRelativePosition,
  crop,
  dragging,
  startDragHandle,
  startNewCrop,
  setCenter,
  moveDragHandle,
  endDragHandle,
  interactive,
  features,
}) => {
  const [left, x, right] = normalize(crop.h)
  const [top, y, bottom] = normalize(crop.v)
  const boxPath = `M${left}, ${top}V${bottom}H${right}V${top}Z`
  const outerPath = 'M0, 0H1V1H0Z'
  const circleRadius = (rx) => ({ rx, ry: rx * size[0] / size[1] || rx })

  const mouseDownHandler = (dragMask) => (e) => startDragHandle(getRelativePosition(e), dragMask)
  const mouseMove = (e) => moveDragHandle(getRelativePosition(e))
  const newCrop = (e) => startNewCrop(getRelativePosition(e))
  const moveCenter = (e) => setCenter(getRelativePosition(e))

  return (
    <div className="overlayWrapper">
      <svg
        className={`overlay${interactive ? '' : ' inactive'}`}
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        height="100%"
        width="100%"
      >
        <symbol id="profile-face" viewBox="0 0 100 100">
          <path
            d={`m15.3 69.6c-2.7-1.8-10.1-3.3-7.91-7.2 2.91-5.2 9.11-11.9
              8.21-17.5-4-24.2 10-39.8 33.9-39.9 24-.09 37.5 12.8 37.5 38.2 0
              35.7-51.1 60.8-59.8 48.5-8.8-12.6-7.6-17.4-11.9-22.1z`}
          />
        </symbol>
        <symbol id="frontal-face" viewBox="0 0 100 100">
          <path
            d={`m50 5c-12.8 0-25.8 7.73-30 16.9-4.19 9.17-.562 14.4-.768
              29.3-.205 15 6.92 30 13.4 34.9 6.49 4.88 11.3 8.89 17.3 8.89 6.04
              0 10.8-4.01 17.3-8.89 6.6-4.9 13.7-19.9 13.5-34.9-.2-14.9
              3.5-20.1-.7-29.3s-17.2-16.9-30-16.9z`}
          />
        </symbol>
        <path
          className="outside"
          fillRule="evenodd"
          d={outerPath + boxPath}
          onMouseDown={newCrop}
        />
        <g className="inside" >
          <path
            onMouseDown={mouseDownHandler([1, 1, 1, 1, 0])}
            onClick={moveCenter}
            className="box"
            d={boxPath}
          />
          <svg
            className="handles"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            height={bottom - top}
            width={right - left}
            x={left}
            y={top}
          >
            { ['1000', '0100', '0010', '0001', '1100', '0110', '0011', '1001'].map(name => (
              <Handle key={name} name={name} mouseDownHandler={mouseDownHandler} />
            ))}
          </svg>
        </g>
        <g className="centerPoint">
          <ellipse
            className="handle"
            style={{ opacity: 0 }}
            onMouseDown={mouseDownHandler([0, 0, 0, 0, 1])}
            cx={x} cy={y} {...circleRadius(0.05)}
          />
          <path className="cross" d={`M0, ${y}H1M${x}, 0V1`} />
        </g>
        { features.map((f, i) => <Feature key={i} {...f} />) }
      </svg>
      { dragging.dragMask && <DragKing
        onMouseMove={mouseMove}
        onMouseUp={endDragHandle}
        onMouseLeave={endDragHandle}
      /> }
    </div>
  )
}

Overlay.propTypes = {
  size: React.PropTypes.array,
  crop: React.PropTypes.object.isRequired,
  dragging: React.PropTypes.object,
  getRelativePosition: React.PropTypes.func.isRequired,
  startDragHandle: React.PropTypes.func.isRequired,
  moveDragHandle: React.PropTypes.func.isRequired,
  endDragHandle: React.PropTypes.func.isRequired,
  setCenter: React.PropTypes.func.isRequired,
  startNewCrop: React.PropTypes.func.isRequired,
  interactive: React.PropTypes.bool.isRequired,
  features: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state, { src }) => state.images[src]

const mapDispatchToProps = (dispatch, { src }) => ({
  setCenter: (position) => {
    dispatch(actions.setCenter(src, position))
  },
  startNewCrop: (position) => {
    dispatch(actions.startNewCrop(src, position))
  },
  startDragHandle: (position, dragMask) => {
    dispatch(actions.startDragHandle(src, position, dragMask))
  },
  moveDragHandle: (position) => {
    dispatch(actions.moveDragHandle(src, position))
  },
  endDragHandle: () => {
    dispatch(actions.endDragHandle(src))
  },
})

Overlay = connect(mapStateToProps, mapDispatchToProps)(Overlay)
export { Overlay }
