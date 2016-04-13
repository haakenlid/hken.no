import React from 'react'
import { connect } from 'react-redux'
import { startDragHandle, moveDragHandle, endDragHandle, setCenter } from './actions'

const DragKing = (props) => (
  <div
    className="dragKing"
    { ...props }
  />
)

const Handle = ({ position, onMouseDown }) => {
  const handleSize = 0.1
  const half = handleSize / 2
  const full = 1 + handleSize
  let dragMask = [0, 0, 0, 0]
  const rectProps = {
    className: `handle ${position}`,
    width: handleSize,
    height: handleSize,
    x: -half,
    y: -half,
  }
  switch (position) {
    case 'left':
      rectProps.height = full
      dragMask = [1, 0, 0, 0]
      break
    case 'right':
      rectProps.height = full
      rectProps.x = 1 - half
      dragMask = [0, 0, 1, 0]
      break
    case 'top':
      rectProps.width = full
      dragMask = [0, 1, 0, 0]
      break
    case 'bottom':
      rectProps.width = full
      rectProps.y = 1 - half
      dragMask = [0, 0, 0, 1]
      break
    default:
      break
  }
  const startDrag = (e) => {
    onMouseDown(e, dragMask)
  }
  return <rect onMouseDown={startDrag} {...rectProps} />
}
Handle.propTypes = {
  position: React.PropTypes.string,
  onMouseDown: React.PropTypes.func,
}

export const Overlay = ({
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
  const onBoxClick = (e) => {
    clickInside(getRelativePosition(e))
  }
  const onHandleMouseDown = (e, dragMask) => {
    startResize(getRelativePosition(e), dragMask)
  }
  const onMouseMove = (e) => {
    doResize(getRelativePosition(e))
  }

  return (
    <div>
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
          d={outerPath + boxPath}
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
          height={bottom - top}
          width={right - left}
          x={left}
          y={top}
        >
        { ['left', 'right', 'top', 'bottom'].map(name => (
          <Handle key={name} position={name} onMouseDown={onHandleMouseDown} />
        ))}
        </svg>
        <path
          className="centerPoint"
          d={`M0, ${y}H1M${x}, 0V1`}
        />
      </svg>
      { console.log('dragging: ', dragging) }
      { dragging.dragMask && <DragKing
        onMouseMove={onMouseMove}
        onMouseUp={endResize}
        onMouseLeave={endResize}
      /> }
    </div>
  )
}

Overlay.propTypes = {
  imgSize: React.PropTypes.array,
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

