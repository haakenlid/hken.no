import React from 'react'
import moment from 'moment'
import { ReadNext, Byline, PageHeader } from 'components'
import { config } from 'config'

export default class BlogPost extends React.Component {
  render() {
    const { post, children, route } = this.props
    const date = moment(post.date || Date.now()).format('MMMM D, YYYY')
    const author = post.author || config.authorName
    return (
      <PageHeader
        title={post.title}
        author={author}
        date={date}
        category="blog"
      >
        <main className="blogpost">
          { children }
        { post.readNext && <ReadNext post={post} pages={route.pages} /> }
        </main>
        <footer>
          <Byline />
        </footer>
      </PageHeader>
    )
  }
}
BlogPost.propTypes = {
  post: React.PropTypes.object,
  route: React.PropTypes.object,
  children: React.PropTypes.node,
}
