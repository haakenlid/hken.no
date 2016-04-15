// Reducers
import { combineReducers } from 'redux'

const imageDefaultState = {
  src: '',
  dragging: {},
  size: [],
  crop: {
    h: [0.1, 0.5, 0.9],
    v: [0.1, 0.5, 0.9],
  },
}

const normalize = (dim) => {
  const sorted = [0, dim[0], dim[2], 1].sort((a, b) => a - b)
  return [sorted[1], dim[1], sorted[2]]
}

const image = (state, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return state || { ...imageDefaultState, ...action.payload }
    case 'MOVE_CENTER': {
      const [x, y] = action.payload.position
      const { h, v } = state.crop
      return {
        ...state,
        crop: {
          h: normalize([h[0], x, h[2]]),
          v: normalize([v[0], y, v[2]]),
        },
      }
    }
    case 'START_DRAG_HANDLE':
      return {
        ...state,
        dragging: {
          dragMask: action.payload.dragMask,
          initalPosition: action.payload.initialPosition,
          initalCrop: state.crop,
        },
      }
    case 'MOVE_DRAG_HANDLE': {
      const [left, up, right, down, center] = state.dragging.dragMask
      const [x, y] = action.payload.position
      let { h, v } = state.crop
      h = normalize([left ? x : h[0], center ? x : h[1], right ? x : h[2]])
      v = normalize([up ? y : v[0], center ? y : v[1], down ? y : v[2]])
      return { ...state, crop: { h, v } }
    }
    case 'END_DRAG_HANDLE':
      return { ...state, dragging: {} }
    case 'SET_IMAGE_SIZE':
      return { ...state, size: action.payload.size }
    default:
      return state
  }
}

const images = (state = {}, action) => {
  if (action.payload && action.payload.src) {
    const src = action.payload.src
    const newState = { ...state }
    newState[src] = image(state[src], action)
    return newState
  }
  return state
}

const RootReducer = combineReducers({
  images,
})
export default RootReducer
