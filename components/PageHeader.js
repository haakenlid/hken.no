import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { SocialMedia, Monogram } from 'components'
import { config } from 'config'
import DocumentTitle from 'react-document-title'
import { getPos, scrollTop } from './utils'

const Logo = () => <Link to={link('/')}><Monogram /></Link>

const NavBar = ({ className = '', ...props }) => (
  <nav className={`NavBar ${className}`} {...props}>
    <Logo />
    <div style={{ flex: 1, margin: '0 1rem' }} />
    <SocialMedia />
  </nav>
)
NavBar.propTypes = {
  className: React.PropTypes.string,
}

const Title = ({ title, date, author, category, className="Title" }) => (
  ! title ? <div /> : (
    <section className={className}>
      {author && <div className="author">{author}</div>}
      {date && <div className="date">{date}</div>}
      {category && <div className="category">{category}</div>}
      {title && <h1 className="title" onClick={scrollTop}>{title}</h1>}
    </section>
  )
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
    if (typeof window !== 'object') { return }
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }
  componentWillUnmount() {
    if (typeof window !== 'object') { return }
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll() {
    const sticky = getPos() > 0
    if (sticky !== this.state.sticky) {
      this.setState({ sticky })
    }
  }
  render() {
    const { sticky } = this.state
    const { title, children } = this.props
    const pageTitle = title ? `${title} | ${config.blogTitle}` : config.blogTitle

    return (
      <DocumentTitle title={ pageTitle }>
        <article>
          <header className="PageHeader" >
            <NavBar />
            <Title {...this.props} />
          </header>
          { sticky &&
            <header className="sticky PageHeader" >
              <div className="drawer" >
                <NavBar />
                <Title {...this.props} />
              </div>
              <Title className="small Title" {...this.props} />
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
}

export { PageHeader }
