import React from 'react'
import { BlogPost } from 'components'

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
  const renderCell = (cell, i) => (
    <Cell
      key={i}
      cellType={cell.cell_type}
      rendered={cell.rendered}
    />
  )
  return (
    <BlogPost post={post} route={route}>
      { cells.map(renderCell) }
    </BlogPost>
  )
}
NotebookWrapper.propTypes = {
  route: React.PropTypes.object,
}
export default NotebookWrapper
