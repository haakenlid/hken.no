import markdownIt from 'markdown-it'
import hljs from 'highlight.js'

/* eslint-disable no-console */
export const highlightjs = (code, language) => {
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

export const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  quotes: '«»‹›',
  highlight: highlightjs,
})

