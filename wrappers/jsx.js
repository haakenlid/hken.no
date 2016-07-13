import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BlogPost } from 'components'
import { getTOC } from 'utils/markdown'

const buildTOC = (children) => {
  // Hack to build a table of contents
  const toc = getTOC([]) // create new toc
  const modifiedChildren = children.map(child => {
    if (child.type && child.type.name === 'Markdown') {
      renderToStaticMarkup(child)
      // Hack that adds 'id' and 'a' to headings
    }
    return child
  })
  getTOC([]) // start from 1 again
  return { toc, modifiedChildren }
}

const JsxWrapper = ({ route, children }) => {
  const post = route.page.data
  const { toc, modifiedChildren } = buildTOC(children)
  return (
    <BlogPost toc={toc} post={post} route={route}>
      { modifiedChildren }
    </BlogPost>
  )
}

JsxWrapper.propTypes = {
  route: React.PropTypes.object,
  children: React.PropTypes.node,
}

export default JsxWrapper
