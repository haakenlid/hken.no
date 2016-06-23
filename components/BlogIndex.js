import React from 'react'
// import access from 'safe-access'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'

const intersect = (a, b) => a.filter(i => (b.indexOf(i) >= 0))
const commonTags = (a, b) => intersect(a, b).length

const publishedPages = route => route.pages
  .filter(page => !!page.data.date)
  .filter(page => new Date() > new Date(page.data.date))
  .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))

const relatedPosts = (post, route, limit = 2) => {
  const tags = post.tags || []
  const pages = publishedPages(route)
    .filter(page => (page.data !== post))
    .map(page => ({ ...page.data, path: page.path,
      related: commonTags(page.tags || [], tags) }))
    .sort((a, b) => b.related - a.related)
  return pages.slice(0, limit)
}

const Teaser = ({ title, path }) => (
  <li>
    <Link to={link(path)}> { title } </Link>
  </li>
)

Teaser.propTypes = {
  title: React.PropTypes.string,
  path: React.PropTypes.string,
}

const blogPosts = route => publishedPages(route)
  .map((page, i) => (
    <Teaser
      key={i}
      path={page.path}
      title={page.data.title}
    />))

const BlogIndex = ({ route }) => (
  <ul className="BlogIndex" >
    { blogPosts(route) }
  </ul>
)
BlogIndex.propTypes = {
  route: React.PropTypes.object,
}
export { BlogIndex, relatedPosts, Teaser }
