import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BlogPost } from 'components'
import { getTOC } from 'utils/markdown'

const JsxWrapper = ({ route, children }) => {
  const post = route.page.data
  const toc = getTOC([])
  children.map(child => {
    if (child.type.name === 'Markdown') {
      renderToStaticMarkup(child)
    }
    return child
  })
  getTOC([])
  // console.log(toc)
  return (
    <BlogPost toc={toc} post={post} route={route}>
      { children }
    </BlogPost>
  )
}

JsxWrapper.propTypes = {
  route: React.PropTypes.object,
  children: React.PropTypes.node,
}

export default JsxWrapper
