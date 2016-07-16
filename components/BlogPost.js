import React from 'react'
import { relatedPosts, BlogPostData, Byline, Page, Teaser } from 'components'
import { TableOfContents } from './TableOfContents'

const BlogPostHeader = props => (
  <div className="BlogPostHeader">
    <BlogPostData {...props} />
    { props.image && <img src={props.image} /> }
    <h1 className="title" >{props.title}</h1>
  </div>
)

BlogPostHeader.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
  category: React.PropTypes.string,
}

class BlogPost extends React.Component {
  render() {
    const { children, route, toc } = this.props
    const { data } = route.page
    const { title, author, tags } = data
    const related = relatedPosts(tags, route)
        .filter(other => other.path !== route.page.path)
        .slice(0, 2)
    toc.unshift({ id: '', text: title, tag: 'H1' })
    return (
      <Page title={title} >
        <div className="BlogPostNavigation">
          <h1>In this article:</h1>
          <section className="TableOfContents" >
            { toc && <TableOfContents items={toc} /> }
          </section>
          <h1>Read Next:</h1>
          <section className="ReadNext">
            { related.map((other, i) => (<Teaser key={i} data={false} {...other} />)) }
          </section>
        </div>
        <main className="BlogPost">
          <BlogPostHeader { ...data } />
          {children}
          <footer>
            <Byline name={author} />
          </footer>
        </main>
      </Page>
    )
  }
}
BlogPost.propTypes = {
  toc: React.PropTypes.array,
  route: React.PropTypes.object,
  children: React.PropTypes.node,
}

BlogPost.defaultProps = {
  toc: [],
}

export { BlogPost }
