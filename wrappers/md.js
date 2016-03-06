import React from 'react'
import moment from 'moment'
import DocumentTitle from 'react-document-title'
import { link } from 'gatsby-helpers'
import ReadNext from '../components/ReadNext'
import { config } from 'config'

import '../css/zenburn.css'

const MarkdownWrapper = ({ route }) => {
  const post = route.page.data

  return (
    <DocumentTitle title={`${post.title} | ${config.blogTitle}`}>
      <div className="markdown">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
          Posted {moment(post.date).format('MMMM D, YYYY')}
        <hr />
        <p>
        <ReadNext post={post} pages={route.pages} />
          Håken Lid
          <img src={link('/hken.png')} />
        </p>
      </div>
    </DocumentTitle>
  )
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
