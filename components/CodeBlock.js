import React from 'react'
import { highlightjs, trimIndentation } from 'utils/markdown'

const CodeBlock = ({ language = '', linenos = true, children }) => (
  <pre
    className="CodeBlock"
    dangerouslySetInnerHTML={{
      __html: highlightjs(
        trimIndentation(children),
        language,
        linenos ? 0 : 10e6,
      ) }}
  />
)
CodeBlock.propTypes = {
  children: React.PropTypes.string,
  language: React.PropTypes.string,
  linenos: React.PropTypes.bool,
}
export { CodeBlock }
