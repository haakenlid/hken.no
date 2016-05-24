import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { Monogram } from 'components'
import { SocialMedia } from 'components/SocialMedia'
import { config } from 'config'
import { getPos, scrollTop } from './utils'

const Logo = () => <Link to={link('/')}><Monogram /></Link>

const NavBar = ({ className = '', ...props }) => (
  <nav className={`NavBar ${className}`} {...props}>
    <Logo />
    <div style={{ flex: 1, margin: '0 1rem' }} />
    <SocialMedia style={{ color: 'red' }} />
  </nav>
)
NavBar.propTypes = {
  className: React.PropTypes.string,
}

const Title = ({ title, date, author, category, className = "Title" }) => (
    <section className={className}>
      {author && <div className="author">{author}</div>}
      {date && <div className="date">{date}</div>}
      {category && <div className="category">{category}</div>}
      {title && <h1 className="title" onClick={scrollTop}>{title}</h1>}
    </section>
)
Title.propTypes = {
  title: React.PropTypes.string,
  date: React.PropTypes.string,
  author: React.PropTypes.string,
  category: React.PropTypes.string,
  className: React.PropTypes.string,
}

class PageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sticky: false }
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    if (typeof window === 'object') {
      window.addEventListener('scroll', this.handleScroll)
      this.handleScroll()
    }
  }
  componentWillUnmount() {
    if (typeof window === 'object') {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
  handleScroll() {
    const sticky = getPos() > 0
    if (sticky !== this.state.sticky) {
      this.setState({ sticky })
    }
  }
  render() {
    const { sticky } = this.state
    const { title, author, date, category, children } = this.props
    const titleProps = { title, author, date, category }
    const pageTitle = title ? `${title} | ${config.blogTitle}` : config.blogTitle

    return (
      <DocumentTitle title={ pageTitle }>
        <article>
          <header className="PageHeader" >
            <NavBar />
            <Title {...titleProps} />
          </header>
          { sticky &&
            <header className="sticky PageHeader" >
              <div className="drawer" >
                <NavBar />
                <Title {...this.props} />
              </div>
              <Title className="small Title" {...titleProps} />
            </header>
          }
          {children}
        </article>
      </DocumentTitle>
    )
  }
}
PageHeader.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
  date: React.PropTypes.string,
  author: React.PropTypes.string,
  category: React.PropTypes.string,
}

export { PageHeader }
