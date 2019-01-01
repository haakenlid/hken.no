import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { Monogram, SocialMedia } from 'components'
import { config } from 'config'

const Logo = () => (
  <div className="Logo animate">
    <Link to={link('/')}>
      <Monogram className="face" />
    </Link>
  </div>
)

const TitleBar = ({ title = 'håken.no' }) => (
  <div className="TitleBar animate">
    <Link to={link('/')}>
      <Monogram className="face" />
    </Link>
    <h1>{title}</h1>
  </div>
)

class Page extends React.Component {
  render() {
    const { title, children } = this.props
    const pageTitle = title
      ? `${title} | ${config.blogTitle}`
      : config.blogTitle
    const [sidebar, ...content] = children
    return (
      <article className="Page">
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <header className="PageHeader">
          <nav className="PageNav">
            <TitleBar title={title} />
            <Logo />
            <section className="sidebar">
              {sidebar}
              <SocialMedia />
            </section>
          </nav>
        </header>
        {content}
      </article>
    )
  }
}

export { Page }
