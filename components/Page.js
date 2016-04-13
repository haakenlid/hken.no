import React from 'react'
import moment from 'moment'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import { ReadNext, Byline } from 'components'

export default class BlogPost extends React.Component {
  render() {
    const { post, children, route } = this.props
    return (
      <DocumentTitle title={`${post.title} | ${config.blogTitle}`}>
        <section className="blogpost">
          <h1>{' '}{post.title || 'no title'}</h1>
          { post.readNext && <ReadNext post={post} pages={route.pages} /> }
          <div>Posted {moment(post.date || Date.now()
                             ).format('MMMM D, YYYY')}</div>
          { children }
          <footer>
            <Byline about="is number one" />
          </footer>
        </section>
      </DocumentTitle>
    )
  }
}
BlogPost.propTypes = {
  post: React.PropTypes.object,
  route: React.PropTypes.object,
  children: React.PropTypes.node,
}
import React from 'react'

const Page = ({ title }) => (
)
Page.propTypes = {
  title: React.PropTypes.
}

export default Page
