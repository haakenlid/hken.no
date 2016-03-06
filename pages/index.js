import React from 'react'
import sortBy from 'lodash/sortBy'
import DocumentTitle from 'react-document-title'
import access from 'safe-access'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { config } from 'config'

const BlogIndex = ({ route }) => {
  const pageLinks = []
  const sortedPages = sortBy(route.pages, (page) =>
    access(page, 'data.date')
  ).reverse()
  sortedPages.forEach((page) => {
    if (access(page, 'file.ext') === 'md') {
      const title = access(page, 'data.title') || page.path
      pageLinks.push(
        <li key={page.path} >
          <Link to={link(page.path)}>{title}</Link>
        </li>
      )
    }
  })
  return (
    <DocumentTitle title={config.blogTitle}>
      <div>
        <p>
          <img src="./hken.png" />
          Written by <strong>{config.authorName}</strong>
        </p>
        <ul>
          {pageLinks}
        </ul>
      </div>
    </DocumentTitle>
  )
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
