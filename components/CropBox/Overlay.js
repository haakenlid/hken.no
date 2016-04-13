import React from 'react'
import Redux from 'redux'
import { Provider, connect } from 'react-redux'

const Handle = ({ position }) => {
  const size = 0.1
  const rectProps = {
    className: `handle ${position}`,
    width: size,
    height: size,
    x: 0,
    y: 0,
  }
  switch (position) {
    case 'left':
      rectProps.height = 1
      break
    case 'right':
      rectProps.height = 1
      rectProps.x = 1 - size
      break
    case 'top':
      rectProps.width = 1
      rectProps.height = size
      break
    case 'bottom':
      rectProps.width = 1
      rectProps.y = 1 - size
      break
    default:
      break
  }
  return <rect {...rectProps} />
}
Handle.propTypes = {
  position: React.PropTypes.string,
}

export const Overlay = ({ crop, setCenterPoint }) => {
  const [left, x, right] = crop.h
  const [top, y, bottom] = crop.v
  const boxPath = `M${left},${top}V${bottom}H${right}V${top}Z`
  const outerPath = 'M0,0H1V1H0Z'
  const getRelativePosition = (e) => {
    const p = e.target.parentElement.getBoundingClientRect()
    return [(e.clientX - p.left) / p.width, (e.clientY - p.top) / p.height]
  }
  const onBoxClick = (e) => {
    setCenterPoint(...getRelativePosition(e))
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
Overlay.propTypes = {
  crop: React.PropTypes.object.isRequired,
  setCenterPoint: React.PropTypes.func.isRequired,
}
