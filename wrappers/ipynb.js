import React from 'react'
import BlogPost from 'components/BlogPost'

const Cell = ({cellData}) => (
  <div className={`markdown cell-${cellData.cell_type}`}>
    { cellData.rendered_markdown &&
      <div dangerouslySetInnerHTML={{ __html: cellData.rendered_markdown }} />
    }
    { cellData.rendered_source &&
      <pre className="cell-input" dangerouslySetInnerHTML={{ __html: cellData.rendered_source }} />
    }
    { cellData.rendered_output &&
      <pre className="cell-output">{cellData.rendered_output }</pre>
    }
  </div>
)

const NotebookWrapper = ({ route }) => {
  const post = route.page.data
  return (
    <BlogPost post={post} route={route}>
      { post.cells.map(cell => <Cell cellData={cell} />) }
    </BlogPost>
  )
}

NotebookWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default NotebookWrapper
