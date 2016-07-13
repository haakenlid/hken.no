import React from 'react'
import { relatedPosts, BlogPostData, Byline, Page, Teaser } from 'components'
import { TableOfContents } from './TableOfContents'

const BlogPostHeader = props => (
  <div className="BlogPostHeader">
    <BlogPostData {...props} />
    <h1 className="title">{props.title}</h1>
  </div>
)

BlogPostHeader.propTypes = {
  title: React.PropTypes.string,
  category: React.PropTypes.string,
}

class BlogPost extends React.Component {
  render() {
    const { post, children, route, toc } = this.props
    const related = relatedPosts(post, route)
    toc.unshift({ id: '', text: post.title, tag: 'H1' })
    return (
      <Page title={post.title} >
        <div className="BlogPostNavigation">
          <section className="TableOfContents" >
            { toc && <TableOfContents items={toc} /> }
          </section>
          <section className="ReadNext">
            { related.map((page, i) => (<Teaser key={i} {...page} />)) }
          </section>
        </div>
        <main className="BlogPost">
          <BlogPostHeader { ...post } />
          {children}
          <footer>
            <Byline />
          </footer>
        </main>
      </Page>
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
