import React from 'react'
import { link } from 'gatsby-helpers'
import { PageHeader } from 'components'

import '../css/styles.scss'


/* eslint-disable react/prefer-stateless-function */
// can't use stateless function, because react-transform-hmr (hot reload) only
// works with classes
// https://github.com/gaearon/react-transform-boilerplate#i-get-full-reload-needed-when-i-edit-some-files
class Template extends React.Component {
  render() {
    const { location, children } = this.props
    return (
      <div>
        <PageHeader frontpage={ location.pathname === link('/') } />
        <main>
          {children}
        </main>
      </div>
    )
  }
}
Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
}

export default Template
