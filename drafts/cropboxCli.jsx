import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { CropBox } from 'components/CropBox/CropBox'
import { cropBoxReducer } from 'components/CropBox/reducers'
import sizeOf from 'image-size'

const store = createStore(cropBoxReducer, {})

const CropboxApp = (props) => (
  <Provider store={ store }>
    <CropBox { ...props } />
  </Provider>
)

/* eslint-disable no-console */
const props = JSON.parse(process.argv[2])
const dims = sizeOf(props.src)
props.interactive = false
props.imageSize = [dims.width, dims.height]
console.log(ReactDOMServer.renderToStaticMarkup(<CropboxApp { ...props } />))
