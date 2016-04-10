import React from 'react'
import { link } from 'gatsby-helpers'
import { config } from 'config'
import { Monogram } from 'components'

const Byline = ({ name, about, avatar }) => (
  <section className="byline parent">
    <Monogram
      style={{ fontSize: '3em', strokeWidth: '15' }}
      className="face"
    />

    <div className="text">
      <div className="name">{name}</div>
      <div className="about">{about}</div>
    </div>
  </section>
)
Byline.propTypes = {
  name: React.PropTypes.string,
  about: React.PropTypes.node,
}
Byline.defaultProps = {
  name: config.authorName,
  about: config.authorAbout,
}

export default Byline
