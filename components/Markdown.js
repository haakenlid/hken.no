import React from 'react'
import { md, trimIndentation } from 'utils/markdown'

const Markdown = ({ children }) => (
  <div
    className="markdown"
    dangerouslySetInnerHTML={{
      __html: md.render(trimIndentation(children)),
    }}
  />
)
Markdown.propTypes = {
  children: React.PropTypes.string,
}
export default Markdown
