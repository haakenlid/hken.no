import React from 'react'
import { Teaser } from 'components'

const intersect = (a, b) => a.filter(i => b.indexOf(i) >= 0)
const commonTags = (a, b) => intersect(a, b).length

const massagePage = page => ({
  ...page.data,
  path: page.path,
  image: page.data.image ? `/${page.file.dirname}/${page.data.image}` : '',
})

const publishedPages = route =>
  route.pages
    .map(massagePage)
    .filter(page => !!page.date)
    .filter(page => new Date() > new Date(page.date))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

const relatedPosts = (tags, route) => {
  const pages = publishedPages(route)
    .map(page => ({ ...page, related: commonTags(page.tags, tags) }))
    .sort((a, b) => b.related - a.related)
  return pages
}

const blogPosts = route =>
  publishedPages(route).map((page, i) => <Teaser key={i} {...page} />)

const BlogIndex = ({ route }) => (
  <section className="BlogPosts">{blogPosts(route)}</section>
)
BlogIndex.propTypes = {
  route: React.PropTypes.object,
}
export { BlogIndex, relatedPosts }
