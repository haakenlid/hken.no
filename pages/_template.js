import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { config } from 'config'

import '../css/styles.css'

const Header = ({ frontpage }) => {
  const headerLink = (
    <Link to={link('/')}>
      {config.blogTitle}
    </Link>
   )
  return frontpage ? <h1>{ headerLink }</h1>
                    : <h3>{ headerLink }</h3>
}

const Template = ({ location, children }) => (
  <div>
    <Header frontpage={ location.pathname === link('/') } />
      {children}
  </div>
)

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
}

export default Template
