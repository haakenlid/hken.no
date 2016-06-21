// Frontpage for the blog
import React from 'react'
import { About } from 'components'
import { BlogIndex } from 'components'
import { Page } from 'components'

class FrontPage extends React.Component {
  render() {
    const { route } = this.props
    return (
      <Page>
        <About />
        <BlogIndex route={route} />
      </Page>
    )
  }
}

FrontPage.propTypes = {
  route: React.PropTypes.object,
}

export default FrontPage
