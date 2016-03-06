import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { prune, include as includes } from 'underscore.string'
import find from 'lodash/find'

const ReadNext = ({ post, pages }) => {
  const { readNext } = post
  let nextPost
  if (readNext) {
    nextPost = find(pages, (page) =>
      includes(page.path, readNext)
    )
  }
  if (!nextPost) {
    return <span> Nope </span>
  }
  nextPost = find(pages, (page) =>
    includes(page.path, readNext.slice(1, -1))
  )
  // Create pruned version of the body.
  const html = nextPost.data.body
  const body = prune(html.replace(/<[^>]*>/g, ''), 200)
  const linkTo = {
    pathname: link(nextPost.path),
    query: { readNext: true },
  }

  return (
    <div>
      <h6>
        READ THIS NEXT:
      </h6>
      <h3>
        <Link to={linkTo} >
          {nextPost.data.title}
        </Link>
      </h3>
      <p>{body}</p>
      <hr />
    </div>
  )
}

ReadNext.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
}
export default ReadNext
