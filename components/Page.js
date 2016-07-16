import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { Monogram, SocialMedia } from 'components'
import { config } from 'config'

// const Monogram = () => <div>Monogram</div>
// const SocialMedia = () => <div>SocialMedia</div>
// const Home = () => <Link className="Logo" to={link('/')}><h1 >håken.no</h1></Link>
const Logo = () => (
  <div className = "Logo animate">
    <Link to={link('/')}>
      <Monogram className="face" />
    </Link>
  </div>
)

const TitleBar = ({ title = 'foo' }) => (
  <div className = "TitleBar animate">
    <Link to={link('/')}>
      <Monogram className="face" />
    </Link>
    <h1>{title}</h1>
  </div>
)
TitleBar.propTypes = {
  title: React.PropTypes.string,
}

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
              <TitleBar title={title} />
              <Logo />
              <section className="sidebar">
                { sidebar }
                <SocialMedia />
              </section>
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
