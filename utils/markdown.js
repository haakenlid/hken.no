import markdownIt from 'markdown-it'
import hljs from 'highlight.js'


const lineSpan = (code) => {
  const lines = code.split('\n')
  return (lines.length < 15) ? code : lines
    .map(l => `<span class=line />${l}</span>`)
    .join('\n')
}

/* eslint-disable no-console */
export const highlightjs = (code, language) => {
  if ((language !== null) && hljs.getLanguage(language)) {
    try {
      return lineSpan(hljs.highlight(language, code).value)
    } catch (_error) {
      console.error(_error)
    }
  }
  try {
    return lineSpan(hljs.highlightAuto(code).value)
  } catch (_error) {
    console.error(_error)
  }
  return ''
}

export const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '«»‹›',
  highlight: highlightjs,
})

