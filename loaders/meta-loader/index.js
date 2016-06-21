import frontMatter from 'front-matter'
import fs from 'fs'
import { renderMarkdown } from '../../utils/markdown'

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
  const body = renderMarkdown(meta.body)
  const meta2 = readMeta(this.resourcePath)
  const result = { ...meta.attributes, ...meta2.attributes, body }
  return `module.exports = ${JSON.stringify(result)}`
}
