// Frontpage for the blog
import React from 'react'
import { About, PageLinks, PageHeader } from 'components'

export default class BlogIndex extends React.Component {
  render() {
    return (
      <PageHeader>
        <main className="frontPage">
          <section className="left">
            <About />
          </section>
          <section className="right">
            <h2> Blog entries </h2>
            <PageLinks route={this.props.route} />
          </section>
        </main>
      </PageHeader>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
