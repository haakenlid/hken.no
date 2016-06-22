import React from 'react'
import moment from 'moment'
import { ReadNext, Byline, Page } from 'components'
import { TableOfContents } from './TableOfContents'
import { config } from 'config'

const Title = ({ title, date, author, category, className = "Title" }) => (
  <section id="title" className={className}>
    {author && <div className="author">{author}</div>}
    {date && <div className="date">{date}</div>}
    {category && <div className="category">{category}</div>}
    {title && <h1 className="title">{title}</h1>}
  </section>
)

Title.propTypes = {
  title: React.PropTypes.string,
  date: React.PropTypes.string,
  author: React.PropTypes.string,
  category: React.PropTypes.string,
  className: React.PropTypes.string,
}

class BlogPost extends React.Component {
  render() {
    const { post, children, route, toc } = this.props
    const date = moment(post.date || Date.now()).format('MMMM D, YYYY')
    const author = post.author || config.authorName
    toc.unshift({ id: '', text: post.title, tag: 'H1' })
    return (
      <Page title={post.title} >
        <section>
          { toc &&
            <TableOfContents items={toc} /> }
          { post.readNext &&
            <ReadNext post={post} pages={route.pages} /> }
        </section>
        <main className="blogpost">
          <Title date={date} author={author} title={post.title} />
          { children }
          <footer>
            <Byline />
          </footer>
          <div id="EOF" />
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
