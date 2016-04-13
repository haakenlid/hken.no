// Reducers
import { combineReducers } from 'redux'

const imageDefaultState = {
  src: '',
  dragging: {},
  size: [],
  aspects: [0.5, 1, 2.5],
  crop: {
    h: [0.1, 0.5, 0.9],
    v: [0.1, 0.5, 0.9],
  },
}

const movePosition = (seq, index, newValue) => {
  let newseq = [...seq]
  newseq[index] = newValue
  newseq = newseq.sort((a, b) => a - b)
  newseq[index] = newValue
  return newseq
}
/* eslint-disable no-case-declarations */
const image = (state, action) => {
  // if (action.type !== 'MOVE_DRAG_HANDLE') console.log(action)
  // if (action.type === 'MOVE_DRAG_HANDLE') console.log('move', action)
  switch (action.type) {
    case 'ADD_IMAGE':
      return state || { ...imageDefaultState, ...action.payload }
    case 'MOVE_CENTER': {
      const [x, y] = action.payload.position
      return {
        ...state,
        crop: {
          h: movePosition(state.crop.h, 1, x),
          v: movePosition(state.crop.v, 1, y),
        },
      }
    }
    case 'START_DRAG_HANDLE':
      return {
        ...state,
        dragging: {
          dragMask: action.payload.dragMask,
          initalPosition: action.payload.initialPosition,
        },
      }
    case 'MOVE_DRAG_HANDLE': {
      const [left, up, right, down] = state.dragging.dragMask
      const [x, y] = action.payload.position
      let { h, v } = state.crop
      h = left ? h = movePosition(h, 0, x) : h
      h = right ? h = movePosition(h, 2, x) : h
      v = up ? v = movePosition(v, 0, y) : v
      v = down ? v = movePosition(v, 2, y) : v
      return {
        ...state,
        crop: { h, v },
      }
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
