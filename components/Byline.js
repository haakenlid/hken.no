import React from 'react'
import { link } from 'gatsby-helpers'
import { Link } from 'react-router'
import { config } from 'config'
import { SocialMedia, Monogram } from 'components'
import './byline.scss'

const Byline = ({ name, about }) => (
  <section className="Byline">
    <Link to={link('/')}>
      <Monogram className="face" />
    </Link>
    <Link to={link('/')} className="text">
      <div className="name">{name}</div>
      <div className="about">{about}</div>
    </Link>
    <SocialMedia />
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
