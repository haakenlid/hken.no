import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { config } from 'config'
import { Monogram } from 'components'

const PageHeader = ({ frontpage }) => {
  const headerLink = (
    <Link to={link('/')}>
      <Monogram />
    </Link>
  )
  return (
    <header className="page-header">
      { headerLink }
    </header>
  )
}
PageHeader.propTypes = {
  frontpage: React.PropTypes.bool,
}

export default PageHeader
