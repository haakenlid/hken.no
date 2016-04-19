import React from 'react'
import moment from 'moment'
import { ReadNext, Byline, PageHeader } from 'components'

export default class BlogPost extends React.Component {
  render() {
    const { post, children, route } = this.props
    return (
      <PageHeader title={post.title}>
        <main className="blogpost">
        <div>Posted {moment(post.date || Date.now()
                             ).format('MMMM D, YYYY')}</div>
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
