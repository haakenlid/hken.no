import React from 'react'
import { BlogPost } from 'components'
// import cheerio from 'cheerio'
import { getTOC, tagHeaders } from 'utils/markdown'

const buildTOC = (cells) => {
  const TOC = getTOC([])
  const findHeaders = (cell) => {
    if (!cell.rendered.markdown) {
      return
    }
    let html = cell.rendered.markdown
    html = tagHeaders(html)
    cell.rendered.markdown = html // eslint-disable-line no-param-reassign
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

const cellFilter = (cells) => cells
  .filter(c => !!c.source[0])
  .filter(c => !c.source[0].match(/^\W*hidden/i))
  .filter(c => !c.metadata.hidden)

const NotebookWrapper = ({ route }) => {
  const cells = cellFilter(route.page.data.cells)
  const toc = buildTOC(cells) // eslint-disable-line
  const renderCell = (cell, i) => (
    <Cell
      key={i}
      cellType={cell.cell_type}
      rendered={cell.rendered}
    />
  )
  return (
    <BlogPost route={route} toc={toc}>
      { cells.map(renderCell) }
    </BlogPost>
  )
}
NotebookWrapper.propTypes = {
  route: React.PropTypes.object,
}
export default NotebookWrapper
