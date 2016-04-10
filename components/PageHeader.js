import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { Monogram } from 'components'
import { config } from 'config'
import DocumentTitle from 'react-document-title'

const PageHeader = ({ title, children }) => {
  const pageTitle = title ? `${title} | ${config.blogTitle}`: config.blogTitle
  return (
    <DocumentTitle title={ pageTitle }>
      <article>
      <header className="parent">
        <div className="page-header">
          <Link to={link('/')}><Monogram /></Link>
          <a href='#'> { title || config.blogTitle }</a>
        </div>
      </header>
      {children}
    </article>
  </DocumentTitle>
  )
}
PageHeader.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
}

export default PageHeader
