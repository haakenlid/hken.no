import React from 'react'
import Wrapper from 'wrappers/jsx'
import { CropBox } from 'components'
import cropBoxReducer from 'components/CropBox/reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const metadata = {
  title: "React Redux image cropping",
  date: "2015-05-01",
  layout: "post",
  readNext: "/image-cropping/",
  path: "/redux-cropper/",
}

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(cropBoxReducer, {}, devTools)

export default class Post extends React.Component {
  static metadata() { return metadata }
  render() {
    return (
      <Wrapper {...this.props} >
        <h1>Cropper</h1>
        <Provider store={ store }>
          <CropBox src="./11-NYH-nyhklarefors-06-SGS.jpg" />
        </Provider>
        <p>This is a work in progress.</p>
        <p>Click inside the main image to change to center of cropping</p>
        <p><em>(resizing is coming soon)</em></p>
      </Wrapper>
    )
  }
}

