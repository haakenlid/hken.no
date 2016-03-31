import frontMatter from 'front-matter'
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'

/* eslint-disable no-console */
const highlight = (str, lang) => {
  if ((lang !== null) && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (_error) {
      console.error(_error)
    }
  }
  try {
    return hljs.highlightAuto(str).value
  } catch (_error) {
    console.error(_error)
  }
  return ''
}
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '«»‹›',
  highlight,
})

const highlightCode = (code, language) => {
  const content = hljs.highlight(language, code, true).value
  const className = language ? `class="lang-${language}"` : ''
  return `<code ${className}>${content}</code>`
}

/* eslint-disable no-param-reassign */
// TODO make this less hacky!
const cellToMarkdown = (cell, language) => {
  if (cell.cell_type === 'markdown') {
    cell.rendered_markdown = md.render(cell.source.join('').trim())
  } else {
    cell.rendered_source = highlightCode(
      cell.source.join('').trim(), language)
    if (cell.outputs.length > 0) {
      const output = cell.outputs[0]
      let content = ''
      switch (output.output_type) {
        case 'execute_result':
          content = output.data['text/plain'].join('')
          break
        case 'stream':
          content = output.text.join('')
          break
        default:
          content = `unknown output data_type\n\n${JSON.stringify(output)}`
      }
      cell.rendered_output = content.trim()
    }
  }
}
/* eslint-enable no-param-reassign */

module.exports = function jupyterLoader(content) {
  this.cacheable()
  const filename = this.resourcePath
  const notebook = JSON.parse(content)
  const meta = {
    date: '1970-01-01',
    layout: 'post',
    title: filename.match(/([^./]+)(\.[^.]*)$/)[1].replace(/[ _]+/g, ' '),
    path: `/${filename.toLowerCase().replace(/[ _]+/g, '-')}/`,
  }
  const language = notebook.metadata.kernelspec.language
  const frontmatter = frontMatter(notebook.cells[0].source.join('')).attributes
  if (Object.keys(frontmatter).length > 0) {
    // found frontmatter in cell
    notebook.cells.shift()
  }
  for (const cell of notebook.cells) {
    cellToMarkdown(cell, language)
  }
  const result = { ...notebook, ...meta, ...frontmatter }
  return `module.exports = ${JSON.stringify(result)}`
}
