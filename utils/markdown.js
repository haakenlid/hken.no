import markdownIt from 'markdown-it'
import hljs from 'highlight.js'


const lineSpan = (code) => {
  const lines = code.split('\n')
  return (lines.length < 15) ? code : lines
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

export const highlightjs = (code, language) => lineSpan(highlight(spaceToTab(code), language))

export const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '«»‹›',
  highlight: highlightjs,
})

