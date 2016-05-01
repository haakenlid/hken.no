import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { CropBox } from 'components/CropBox/CropBox'
import { render } from 'react-dom'
import CropBoxReducer from 'components/CropBox/reducers'

const store = createStore(CropBoxReducer, {})
const CropboxApp = (props) => (
  <Provider store={ store }>
    <CropBox { ...props } />
  </Provider>
)
const filename = './delinquents.jpg'
const elementID = 'reactApp'

render(<CropboxApp src={filename} />, document.getElementById(elementID))
