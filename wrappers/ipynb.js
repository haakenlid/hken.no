import React from 'react'
import { BlogPost } from 'components'
import cheerio from 'cheerio'

const getToc = (cells) => {
  const TOC = []
  const findHeaders = (cell) => {
    if (!cell.rendered.markdown) {
      return
    }
    const html = cell.rendered.markdown
    const $ = cheerio.load(html)
    $(':header').each((i, el) => {
      const element = $(el)
      const text = element.text()
      const index = TOC.length + 1
      const tag = $(element).prop('tagName')
      const level = parseInt(tag[1], 10)
      const id = `${index}-${text.replace(/\s+/g, '-').toLowerCase()}`
      const dict = { tag, level, text, id }
      TOC.push(dict)
      element.attr('id', id)
    })
    cell.rendered.markdown = $.html() // eslint-disable-line no-param-reassign
  }
  cells.map(findHeaders)
  return TOC
}


const Cell = ({ rendered, cellType }) => (
rendered.markdown ? (
  <div
    className="markdown cell"
    dangerouslySetInnerHTML={{ __html: rendered.markdown }}
  />
) : (
  <div className={`${cellType} cell`} >
    { rendered.source &&
      <pre className="cell-input" dangerouslySetInnerHTML={{ __html: rendered.source }} />
    }
    { rendered.output &&
      <pre className="cell-output">{ rendered.output }</pre>
    }
    { rendered.html &&
      <div className="cell-output" dangerouslySetInnerHTML={{ __html: rendered.html }} />
      }
    </div>
  )
)

Cell.propTypes = {
  rendered: React.PropTypes.object,
  cellType: React.PropTypes.string,
}

const NotebookWrapper = ({ route }) => {
  const post = route.page.data
  const cells = post.cells.filter(cell => !cell.metadata.hidden)
  const toc = getToc(cells) // eslint-disable-line
  const renderCell = (cell, i) => (
    <Cell
      key={i}
      cellType={cell.cell_type}
      rendered={cell.rendered}
    />
  )
  return (
    <BlogPost post={post} route={route} toc={toc}>
      { cells.map(renderCell) }
    </BlogPost>
  )
}
NotebookWrapper.propTypes = {
  route: React.PropTypes.object,
}
export default NotebookWrapper
