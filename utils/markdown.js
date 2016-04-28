import markdownIt from 'markdown-it'
import hljs from 'highlight.js'


const lineSpan = (code, limit) => {
  const lines = code.split('\n')
  return (lines.length < limit) ? code : lines
    .map(l => `<span class=line />${l}</span>`)
    .join('\n')
}

const spaceToTab = code => code.replace(/ {4}/g, '\t', code)

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

export const trimIndentation = (raw) => {
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

export const highlightjs = (code, language, limit = 15) => (
  lineSpan(highlight(spaceToTab(code), language, limit))
)

export const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '«»‹›',
  highlight: highlightjs,
})

