// 404 not found
import React from 'react'
import { Monogram, PageHeader } from 'components'
// import { Link } from 'react-router'
import { link } from 'gatsby-helpers'

export default class NotFound extends React.Component {
  render() {
    return (
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
      }} >
          <h1>404 Not found</h1>
        <a href={link('/')} style={{ color: 'inherit' }}>
          <Monogram className="loop"
            style={{
              strokeWidth: 5,
              fontSize: '15rem',
            }}
          />
        </a>
      </main>
    )
  }
}

NotFound.propTypes = {
  route: React.PropTypes.object,
}

export default NotFound
