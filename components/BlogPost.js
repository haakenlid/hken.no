import React from 'react'
import moment from 'moment'
import { ReadNext, Byline, PageHeader } from 'components'
import { TableOfContents } from './TableOfContents'
import { config } from 'config'

class BlogPost extends React.Component {
  render() {
    const { post, children, route, toc } = this.props
    const date = moment(post.date || Date.now()).format('MMMM D, YYYY')
    const author = post.author || config.authorName
    return (
      <PageHeader
        title={post.title}
        author={author}
        date={date}
        category="blog"
      >
        { toc && <TableOfContents items={toc} /> }
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
  toc: React.PropTypes.array,
  route: React.PropTypes.object,
  children: React.PropTypes.node,
}

BlogPost.defaultProps = {
  toc: [],
}

export { BlogPost }
