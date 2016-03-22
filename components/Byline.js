import React from 'react'
import { link } from 'gatsby-helpers'
import { config } from 'config'

const Byline = ({ name, about, avatar }) => (
  <section className="Byline">
    <img className="avatar" src={link(avatar)} alt={name} />
    <div className="name">{name}</div>
    <div className="about">{about}</div>
  </section>
)
Byline.propTypes = {
  name: React.PropTypes.string,
  avatar: React.PropTypes.string,
  about: React.PropTypes.node,
}
Byline.defaultProps = {
  name: config.authorName,
  avatar: config.authorAvatar,
  about: config.authorAbout,
}

export default Byline
