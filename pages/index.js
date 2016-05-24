// Frontpage for the blog
import React from 'react'
import { About } from 'components'
import { BlogPosts } from 'components'
import { PageHeader } from 'components'

class BlogIndex extends React.Component {
  render() {
    const { route } = this.props
    return (
      <PageHeader>
        <main className="frontPage">
          <section className="left">
            <About />
          </section>
          <section className="right">
            <BlogPosts route={route} />
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
