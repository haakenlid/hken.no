import React from 'react'
import BlogPost from 'components/BlogPost'

const metadata = {
  title: "React Redux image cropping",
  date: "2016-05-01",
  layout: "post",
  readNext: "/image-cropping/",
  path: "/redux-cropper/",
}

class Thing extends React.Component {
  constructor() {
    super()
    this.state = { count: 0 }
    this.handlePlusClick = this.handlePlusClick.bind(this)
    this.handleMinusClick = this.handleMinusClick.bind(this)
  }
  handlePlusClick() {
    this.setState({ count: this.state.count + 1 })
  }
  handleMinusClick() {
    this.setState({ count: this.state.count - 1 })
  }
  render() {
    return (
      <BlogPost post={metadata} route={this.props.route}>
        <h3>Counter Hurra</h3>
        <p>{this.state.count}</p>
        <button onClick={this.handlePlusClick}>+</button>
        <button onClick={this.handleMinusClick}>-</button>
      </BlogPost>
    )
  }
}

Thing.propTypes = {
  route: React.PropTypes.object,
}
Thing.metadata = () => metadata
export default Thing
