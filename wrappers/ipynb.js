import React from 'react'
import BlogPost from 'components/BlogPost'
import '../css/zenburn.css'

const Cell = ({cellData}) => (
  <div className={`markdown cell-${cellData.cell_type}`}>
    { cellData.rendered_markdown &&
      <div dangerouslySetInnerHTML={{ __html: cellData.rendered_markdown }} />
    }
    { cellData.rendered_source &&
      <div dangerouslySetInnerHTML={{ __html: cellData.rendered_source }} />
    }
    { cellData.rendered_output &&
      <div dangerouslySetInnerHTML={{ __html: cellData.rendered_output }} />
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
