import frontMatter from 'front-matter'
import fs from 'fs'
import { renderMarkdown } from '../../utils/markdown'

const defaultMetaData = (filePath) => {
  const metaPath = filePath.replace(/\.\S+/, '.meta')
  const imgPath = filePath.replace(/\.\S+/, '.jpg')
  const date = fs.statSync(filePath).mtime
  let data = {
    image: null,
    tags: ['foo'],
    author: '',
    date,
  }
  try {
    const fileContent = fs.readFileSync(metaPath, 'utf8')
    const matter = JSON.parse(fileContent)
    data = { ...data, ...matter }
  } catch (e) { /* console.log(e) /* meta file does not exist */ }
  try {
    fs.statSync(imgPath)
    data.image = imgPath
  } catch (e) { /* console.log(e) /* image does not exist */ }
  return data
}

module.exports = function metaLoader(content) {
  this.cacheable()
  const source = this.resourcePath
  const { body, attributes } = frontMatter(content)
  const renderedBody = renderMarkdown(body)
  const extraAttributes = defaultMetaData(source)
  const result = {
    source,
    ...extraAttributes,
    ...attributes,
    body: renderedBody,
  }
  // console.log(result)
  return `module.exports = ${JSON.stringify(result)}`
}
