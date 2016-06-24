import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { Monogram } from 'components'
import { SocialMedia } from 'components/SocialMedia'
import { config } from 'config'

// const Home = () => <Link className="Logo" to={link('/')}><h1 >håken.no</h1></Link>
const Logo = () => (
  <div className = "Logo animate">
    <Link to={link('/')}>
      <Monogram className="face" />
    </Link>
  </div>
)

class Page extends React.Component {
  render() {
    const { title, children } = this.props
    const pageTitle = title ? `${title} | ${config.blogTitle}` : config.blogTitle
    const [sidebar, ...content] = children
    return (
      <DocumentTitle title={ pageTitle }>
        <article className="Page">
          <header className="PageHeader">
            <nav className="PageNav" >
              <Logo />
              { sidebar }
              <SocialMedia style={{ color: 'red' }} />
            </nav>
          </header>
          { content }
        </article>
      </DocumentTitle>
    )
  }
}

Page.propTypes = {
  children: React.PropTypes.node,
  title: React.PropTypes.string,
}

export { Page }
