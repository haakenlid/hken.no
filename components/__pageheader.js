import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { SocialMedia, Monogram } from 'components'
import { config } from 'config'
import DocumentTitle from 'react-document-title'
// import { getPos, scrollTop } from './utils'

const Logo = () => <Link to={link('/')}><Monogram /></Link>

const PageTitle = (props) => <h1 className="PageTitle" {...props} />

class PageHeader extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { minimized: false }
  //   this.handleScroll = this.handleScroll.bind(this)
  // }
  // componentDidMount() {
  //   if (typeof window !== 'object') return
  //   window.addEventListener('scroll', this.handleScroll)
  //   this.handleScroll()
  // }
  // componentWillUnmount() {
  //   if (typeof window !== 'object') return
  //   window.removeEventListener('scroll', this.handleScroll)
  // }
  // handleScroll() {
  //   const minimized = getPos() > 10
  //   if (minimized !== this.state.minimized) {
  //     this.setState({ minimized })
  //   }
  // }
  render() {
    // const { minimized } = this.state
    const { title, children } = this.props
    const minimized = true
    const pageTitle = title ? `${title} | ${config.blogTitle}` : config.blogTitle

    return (
      <DocumentTitle title={ pageTitle }>
        <article>
        <header >
          <div className={`PageHeader ${minimized ? 'minimized' : 'maximized'}`} >
            <div className="row1">
              <Logo />
              <div style={{ flex: 1, margin: '0 1rem' }} >håken.no</div>
              <SocialMedia />
            </div>
            <div className="row2">
              <PageTitle>{ title }</PageTitle>
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

export { PageHeader }
