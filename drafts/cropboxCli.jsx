import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { CropBox } from 'components/CropBox/CropBox'
import CropBoxReducer from 'components/CropBox/reducers'
// import sizeOf from 'image-size'

const store = createStore(CropBoxReducer, {})

const CropboxApp = (props) => (
  <Provider store={ store }>
    <CropBox { ...props } />
  </Provider>
)

/* eslint-disable no-console */
const props = JSON.parse(process.argv[2])
props.interactive = false
// console.log(props)
console.log(ReactDOMServer.renderToStaticMarkup(<CropboxApp { ...props } />))
// const filename = args[0] || './delinquents.jpg'
// const cropData = { h: [0, 0.2, 0.9], v: [0.2, 0.3, 0.5] }
// console.log(ReactDOMServer.renderToString(<CropboxApp src={filename} />))
