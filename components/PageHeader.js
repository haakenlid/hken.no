import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { SocialMedia, Monogram } from 'components'
import { config } from 'config'
import DocumentTitle from 'react-document-title'
import { getPos, scrollTop } from './utils'

const Logo = () => <Link to={link('/')}><Monogram /></Link>

const PageTitle = ({ children }) => (
  <h1
    className="PageTitle"
  >
    { children }
  </h1>
)
PageTitle.propTypes = {
  children: React.PropTypes.node,
}

class PageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { minimized: false }
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll() {
    const minimized = getPos() > 10
    if (minimized !== this.state.minimized) {
      this.setState({ minimized })
    }
  }
  render() {
    const { title, children } = this.props
    const { minimized } = this.state
    const pageTitle = title ? `${title} | ${config.blogTitle}` : config.blogTitle

    return (
      <DocumentTitle title={ pageTitle }>
        <article>
        <header >
          <div
            onClick={scrollTop}
            className={`PageHeader ${minimized ? 'minimized' : 'maximized'}`}
          >
            <div className="row1">
              <Logo />
              <div style={{ flex: 1, margin: '0 1rem' }} >håken.no</div>
              <SocialMedia />
            </div>
            <div className="row2">
              <PageTitle>{ title || config.blogTitle }</PageTitle>
            </div>
          </div>
        </header>
        {children}
      </article>
    </DocumentTitle>
    )
  }
}
PageHeader.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
}

export default PageHeader
