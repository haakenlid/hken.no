import React from 'react'
import moment from 'moment'
import { config } from 'config'
import { ReadNext, Byline, PageHeader } from 'components'

export default class BlogPost extends React.Component {
  render() {
    const { post, children, route } = this.props
    console.log(post)
    return (
      <PageHeader title={post.title}>
        <main className="blogpost">
          <h1>{post.title || 'no title'}</h1>
          { post.readNext && <ReadNext post={post} pages={route.pages} /> }
          <div>Posted {moment(post.date || Date.now()
                             ).format('MMMM D, YYYY')}</div>
          { children }
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
