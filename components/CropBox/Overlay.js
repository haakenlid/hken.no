import React from 'react'
import { connect } from 'react-redux'
import { startDragHandle, moveDragHandle, endDragHandle, setCenter } from './actions'
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

export const Overlay = ({
  size,
  getRelativePosition,
  crop,
  dragging,
  clickInside,
  startResize,
  doResize,
  endResize,
}) => {
  const [left, x, right] = crop.h
  const [top, y, bottom] = crop.v
  const boxPath = `M${left}, ${top}V${bottom}H${right}V${top}Z`
  const outerPath = 'M0, 0H1V1H0Z'
  const circleRadius = (rx) => ({ rx, ry: rx * size[0] / size[1] || rx })

  const mouseDownHandler = (dragMask) => (e) => startResize(getRelativePosition(e), dragMask)
  const mouseMove = (e) => doResize(getRelativePosition(e))
  const boxClick = (e) => clickInside(getRelativePosition(e))

  return (
    <div className="overlayWrapper">
      <svg
        className="overlay"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        height="100%"
        width="100%"
      >
        <path
          className="outside"
          fillRule="evenodd"
          d={outerPath + boxPath}
        />
        <path
          className="inside"
          d={boxPath}
          onClick={boxClick}
        />
        <g className="centerPoint">
          <ellipse
            className="handle"
            onMouseDown={mouseDownHandler([0, 0, 0, 0, 1])}
            cx={x} cy={y} {...circleRadius(0.05)}
          />
          <path className="cross" d={`M0, ${y}H1M${x}, 0V1`} />
        </g>
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
      </svg>
      { dragging.dragMask && <DragKing
        onMouseMove={mouseMove}
        onMouseUp={endResize}
        onMouseLeave={endResize}
      /> }
    </div>
  )
}

Overlay.propTypes = {
  size: React.PropTypes.array,
  crop: React.PropTypes.object.isRequired,
  dragging: React.PropTypes.object,
  getRelativePosition: React.PropTypes.func.isRequired,
  clickInside: React.PropTypes.func.isRequired,
  startResize: React.PropTypes.func.isRequired,
  doResize: React.PropTypes.func.isRequired,
  endResize: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, { src }) => state.images[src]

const mapDispatchToProps = (dispatch, { src }) => ({
  clickInside: (position) => {
    dispatch(setCenter(src, position))
  },
  startResize: (position, dragMask) => {
    dispatch(startDragHandle(src, position, dragMask))
  },
  doResize: (position) => {
    dispatch(moveDragHandle(src, position))
  },
  endResize: () => {
    dispatch(endDragHandle(src))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)

