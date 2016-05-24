import React from 'react'
import access from 'safe-access'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'

const PageLink = ({ page }) => (
  <li>
    <Link to={link(page.path)}>
      { access(page, 'data.title') || page.path }
    </Link>
    <span>{" : "}{ page.data.date }</span>
  </li>
)
PageLink.propTypes = {
  page: React.PropTypes.object,
}

const blogPosts = pages => pages
    .filter(page => access(page, 'data.date'))
    .filter(page => new Date() > new Date(page.data.date))
    .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
    .map(page => <PageLink page={page} key={page.path} />)

const BlogPosts = ({ route }) => (
  <ul className="BlogPosts" >
    { blogPosts(route.pages) }
  </ul>
)
BlogPosts.propTypes = {
  route: React.PropTypes.object,
}
export { BlogPosts }
