import React from 'react'
import { renderMarkdown } from 'utils/markdown'

const Markdown = ({ children }) => (
  <div
    className="markdown"
    dangerouslySetInnerHTML={{
      __html: renderMarkdown(children),
    }}
  />
)
Markdown.propTypes = {
  children: React.PropTypes.string,
}
export { Markdown }
