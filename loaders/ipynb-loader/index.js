import frontMatter from 'front-matter'
import { highlightjs, md } from '../../utils/markdown'

const highlightCode = (code, language) => {
  // const content = hljs.highlight(language, code, true).value
  const content = highlightjs(code, language)
  const className = language ? `class="lang-${language}"` : ''
  return `<code ${className}>${content}</code>`
}

// TODO make this less hacky!
const cellToMarkdown = (cell, language) => {
  const rendered = {
    markdown: null,
    source: null,
    output: null,
  }
  if (cell.cell_type === 'markdown') {
    rendered.markdown = md.render(cell.source.join('').trim())
  } else {
    rendered.source = highlightCode(
      cell.source.join('').trim(), language
    )
    if (cell.outputs.length > 0) {
      const output = cell.outputs[0]
      switch (output.output_type) {
        case 'execute_result':
          if (output.data['text/html']) {
            rendered.html = output.data['text/html'].join('').trim()
          } else {
            rendered.output = output.data['text/plain'].join('').trim()
          }
          break
        case 'stream':
          rendered.output = output.text.join('').trim()
          break
        default:
          rendered.output = `unknown output data_type\n\n${JSON.stringify(output)}`
      }
    }
  }
  return rendered
}

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
    cell.rendered = cellToMarkdown(cell, language)
  }
  const result = { ...notebook, ...meta, ...frontmatter }
  return `module.exports = ${JSON.stringify(result)}`
}
