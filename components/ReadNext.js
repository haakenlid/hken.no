import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { include as includes } from 'underscore.string'
import find from 'lodash/find'

const ReadNext = ({ post, pages }) => {
  const nextPost = find(pages, (page) =>
    includes(page.path, post.readNext.slice(1, -1))
  )
  return !nextPost ? <div /> : (
    <div>
      <p>
        Read Next: <Link to={link(nextPost.path)} >
          {nextPost.data.title}
        </Link>
      </p>
    </div>
  )
}
ReadNext.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
}
export default ReadNext
