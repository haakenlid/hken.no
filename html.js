import React from 'react'
import { Helmet } from 'react-helmet'
import { link } from 'gatsby-helpers'

const Head = ({ title }) => (
  <head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0"
    />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="theme-color" content="#fff" />
    <meta name="application-name" content="haken.no" />
    <link rel="manifest" href="/favicon/manifest.json" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/favicon/android-chrome-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon/favicon-96x96.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="230x230"
      href="/favicon/favicon-230x230.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/favicon/apple-touch-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      href="/favicon/apple-touch-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href="/favicon/apple-touch-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="/favicon/apple-touch-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/favicon/apple-touch-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/favicon/apple-touch-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/favicon/apple-touch-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/favicon/apple-touch-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon-180x180.png"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    <meta name="apple-mobile-web-app-title" content="haken.no" />
    {process.env.NODE_ENV === 'production' && (
      <link rel="stylesheet" href={link('/styles.css')} />
    )}
  </head>
)

/* eslint-disable react/prefer-stateless-function */
class Html extends React.Component {
  render() {
    const { body = '<div>...</div>', title = 'håken.no' } = this.props
    return (
      <html lang="en">
        <Head title={title} />
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: body }} />
          <script src={link('/bundle.js')} />
        </body>
      </html>
    )
  }
}

export default Html
