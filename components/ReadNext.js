import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { prune, include as includes } from 'underscore.string'
import find from 'lodash/find'

const ReadNext = ({ post, pages }) => {
  const nextPost = find(pages, (page) =>
    includes(page.path, post.readNext.slice(1, -1))
  )

  return (
    <div>
      <h4>
        Read this next:
      </h4>
      <h3>
        <Link to={nextPost.path} >
          {nextPost.data.title}
        </Link>
      </h3>
    </div>
  )
}

ReadNext.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
}
export default ReadNext
