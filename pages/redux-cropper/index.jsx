import React from 'react'
import Wrapper from 'wrappers/jsx'
import { Markdown } from 'components'

const metadata = {
  title: "React Redux image cropping",
  date: "2015-05-01",
  layout: "post",
  readNext: "/image-cropping/",
  path: "/redux-cropper/",
}
export default class Post extends React.Component {
  static metadata() { return metadata }
  render() {
    return (
      <Wrapper {...this.props} >
        <Markdown children={`
          ### Hello World
          You can write markdown here
          >Blockquote works like this

              here's some code
        `}
        />
      </Wrapper>
    )
  }
}
