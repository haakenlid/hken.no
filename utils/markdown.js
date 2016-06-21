import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import cheerio from 'cheerio'

const spaceToTab = code => code.replace(/ {4}/g, '\t', code)

const slugify = (text) => (
  text
  .toString()
  .replace(/[-\s]+/g, '-')        // Replace spaces with -
  .replace(/[^-\w]+/g, '')       // Remove all non-word chars
  .replace(/-*$|^-*/g, '')        // Remove trailing or leading dashes
)

let TOC = []

const getTOC = (toc) => {
  TOC = (toc === undefined) ? TOC : toc
  return TOC
}

const tagHeaders = (html) => {
  const $ = cheerio.load(html)
  $(':header').each((i, el) => {
    const element = $(el)
    const text = element.text()
    const tag = $(element).prop('tagName')
    const id = slugify(`${TOC.length + 1} ${text}`)
    // const anchor = $(`<a href="#${id}">x </a>`)
    TOC.push({ tag, text, id })
    element.attr('id', id)
    // element.before(anchor)
  })
  return $.html()
}

/* eslint-disable no-console */
const highlight = (code, language) => {
  if ((language !== null) && hljs.getLanguage(language)) {
    try {
      return hljs.highlight(language, code).value
    } catch (_error) {
      console.error(_error)
    }
  }
  try {
    return hljs.highlightAuto(code).value
  } catch (_error) {
    console.error(_error)
  }
  return ''
}

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

const renderCode = (code, language) => highlight(
  spaceToTab(trimIndentation(code)),
  language
)

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '«»‹›',
  highlight: renderCode,
})

const renderMarkdown = (markdown) => tagHeaders(
  md.render(trimIndentation(markdown)))

export { tagHeaders, getTOC, renderCode, renderMarkdown }
