// Frontpage for the blog
import React from 'react'
import { PageLinks, PageHeader } from 'components'

export default class BlogIndex extends React.Component {
  render() {
    return (
      <PageHeader>
        <main>
          <h2> Blog entries </h2>
          <PageLinks route={this.props.route} />
        </main>
      </PageHeader>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
