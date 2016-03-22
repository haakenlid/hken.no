import React from 'react'
import DocumentTitle from 'react-document-title'
import { link } from 'gatsby-helpers'

/* eslint-disable react/prefer-stateless-function */
export default class Html extends React.Component {
  render() {
    const { favicon, body } = this.props
    let title = DocumentTitle.rewind()
    if (this.props.title) {
      title = this.props.title
    }

    let cssLink
    if (process.env.NODE_ENV === 'production') {
      cssLink = <link rel="stylesheet" href={link('/styles.css')} />
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0"
          />
          <title>{this.props.title}</title>
          <link rel="shortcut icon" href={favicon} />
          {cssLink}
        </head>
        <body>
          <div
            id="react-mount"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <script src={link('/bundle.js')} />
        </body>
      </html>
    )
  }
}


Html.propTypes = {
  body: React.PropTypes.string,
  favicon: React.PropTypes.string,
  title: React.PropTypes.string,
}

Html.defaultProps = { body: '<div>loading ...</div>' }
