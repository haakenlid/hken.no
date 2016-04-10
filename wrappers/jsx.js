import React from 'react'
import BlogPost from 'components/BlogPost'

const JsxWrapper = ({ route, children }) => {
  const post = route.page.data
  return (
    <BlogPost post={post} route={route}>
      { children }
    </BlogPost>
  )
}

JsxWrapper.propTypes = {
  route: React.PropTypes.object,
  children: React.PropTypes.node,
}

export default JsxWrapper
