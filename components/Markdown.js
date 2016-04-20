import React from 'react'
import { md } from 'utils/markdown'

const trimIndentation = (raw) => {
  /* trim blank lines and leading indentation from source */
  const lines = raw.split('\n')
  let indentation = ''

  try {
    while (lines[0].trim() === '') lines.shift()
    while (lines[lines.length - 1].trim() === '') lines.pop()
    indentation = lines[0].match(/^\s*/)
  } catch (e) {
    return ''
  }
  const regex = RegExp(`^${indentation}`)
  return lines.map(line => line.replace(regex, '')).join('\n')
}

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
