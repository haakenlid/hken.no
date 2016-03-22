import React from 'react'
import moment from 'moment'
import DocumentTitle from 'react-document-title'
import { link } from 'gatsby-helpers'
import { config } from 'config'
import ReadNext from 'components/ReadNext'
import Byline from 'components/Byline'

import '../css/zenburn.css'

const BlogPost = ({ post, children, route }) => (
  <DocumentTitle title={`${post.title} | ${config.blogTitle}`}>
    <section className="blogpost">
      <h1>{post.title || 'no title'}</h1>
      { post.readNext && <ReadNext post={post} pages={route.pages} /> }
      <div>Posted {moment(post.date || new Date.now()
                         ).format('MMMM D, YYYY')}</div>
      { children }
      <footer>
        <Byline about="is number one" />
      </footer>
    </section>
  </DocumentTitle>
)

//
BlogPost.propTypes = {
  post: React.PropTypes.object,
  route: React.PropTypes.object,
  children: React.PropTypes.node,
}

export default BlogPost
