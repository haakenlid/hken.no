// Frontpage for the blog
import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import PageLinks from 'components/PageLinks'

const BlogIndex = ({ route }) => (
  <DocumentTitle title={config.blogTitle}>
    <main>
      <PageLinks route={route} />
    </main>
  </DocumentTitle>
)

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
