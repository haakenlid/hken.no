import React from 'react'
import { BlogPost } from 'components'
import { tagHeaders, getTOC } from 'utils/markdown'

const MarkdownWrapper = ({ route }) => {
  const toc = getTOC([])
  const body = tagHeaders(post.body)
  return (
    <BlogPost route={route} toc={toc} >
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </BlogPost>
  )
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
