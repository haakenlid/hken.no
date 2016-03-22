import frontMatter from 'front-matter'
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import fs from 'fs'

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
  highlight,
})

const readMeta = (filePath) => {
  const metaPath = filePath.replace(/\.\S+/, '.meta')
  try {
    const data = fs.readFileSync(metaPath, 'utf8')
    return frontMatter(data)
  } catch (e) {
    return { attributes: {} }
  }
}

module.exports = function metaLoader(content) {
  this.cacheable()
  const meta = frontMatter(content)
  const body = md.render(meta.body)
  const meta2 = readMeta(this.resourcePath)
  const result = { ...meta.attributes, ...meta2.attributes, body }
  return `module.exports = ${JSON.stringify(result)}`
}
