import React from 'react'
import { BlogPost } from 'components'

const MarkdownWrapper = ({ route }) => {
  const post = route.page.data
  return (
    <BlogPost post={post} route={route}>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </BlogPost>
  )
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
