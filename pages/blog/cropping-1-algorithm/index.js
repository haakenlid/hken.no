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

const devTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
  window.devToolsExtension() : f => f
const store = createStore(cropBoxReducer, {}, devTools)

export default class Post extends React.Component {
  static metadata() { return metadata }
  render() {
    return (
      <Provider store={ store }>
        <Wrapper {...this.props} >
          <h1>Cropper</h1>
          <CropBox src="./11-NYH-nyhklarefors-06-SGS.jpg" />
          <CropBox src="./11-NYH-nyhklarefors-01-SGS.jpg" />
          <CropBox src="./10-KUL-kulkantinesa-01-SGS.jpg" />
        </Wrapper>
      </Provider>
    )
  }
}

