import React from 'react'
import { renderCode } from 'utils/markdown'

const CodeBlock = ({ language = '', children }) => (
  <pre className="CodeBlock">
    <code
      className={ language && `lang-${language}` }
      dangerouslySetInnerHTML={{ __html: renderCode(children, language) }}
    />
  </pre>
)
CodeBlock.propTypes = {
  children: React.PropTypes.string,
  language: React.PropTypes.string,
}
export { CodeBlock }
