import React from 'react'
import { Teaser } from 'components'

const intersect = (a, b) => a.filter(i => (b.indexOf(i) >= 0))
const commonTags = (a, b) => intersect(a, b).length

const massagePage = page => ({
  ...page.data,
  path: page.path,
  image: page.data.image ? `/${page.file.dirname}/${page.data.image}` : '',
})

const publishedPages = route => route.pages
  .map(massagePage)
  .filter(page => !!page.date)
  .filter(page => new Date() > new Date(page.date))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const relatedPosts = (post, route, limit = 2) => {
  const self = post
  const pages = publishedPages(route)
    .filter(page => (page.source !== self.source))
    .map(page => ({ ...page, related: commonTags(page.tags, self.tags) }))
    .sort((a, b) => b.related - a.related)
  return pages.slice(0, limit)
}

const blogPosts = route => publishedPages(route)
  .map((page, i) => (
    <Teaser
      key={i}
      {...page}
    />
  )
)

const BlogIndex = ({ route }) => (
  <ul className="Index" >
    { blogPosts(route) }
  </ul>
)
BlogIndex.propTypes = {
  route: React.PropTypes.object,
}
export { BlogIndex, relatedPosts }
