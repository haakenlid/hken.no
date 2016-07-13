import React from 'react'
import Wrapper from 'wrappers/jsx'
import * as Icons from 'components/lineicons'
// import { CodeBlock, CropBox, Markdown } from 'components'

const metadata = {
  title: "Icons",
  date: "2016-07-01",
  layout: "post",
  tags: ["svg", "icons"],
}


export default class Post extends React.Component {
  static metadata() { return metadata }
  render() {
    const icons = Object.keys(Icons).map(
      (key) => {
        const Icon = Icons[key]
        return <span title={key} key={key}><Icon /></span>
      }
    )
    const myStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      fontSize: '2em',
    }
    return (
      <Wrapper {...this.props} >
        <p> All the icons </p>
        <section style={myStyle}>
          { icons }
        </section>
      </Wrapper>
    )
  }
}

