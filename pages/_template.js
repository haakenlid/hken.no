import React from 'react'
import '../css/styles.scss'

/* eslint-disable react/prefer-stateless-function */
// can't use stateless function, because react-transform-hmr (hot reload) only
// works with classes
// https://github.com/gaearon/react-transform-boilerplate#i-get-full-reload-needed-when-i-edit-some-files
class Template extends React.Component {
  render() {
    return this.props.children
  }
}
Template.propTypes = {
  children: React.PropTypes.node,
}

export default Template
