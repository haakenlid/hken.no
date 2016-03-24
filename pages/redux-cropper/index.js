import React from 'react'
import BlogPost from 'components/BlogPost'

const metadata = {
  title: "React Redux image cropping",
  date: "2016-05-01",
  layout: "post",
  readNext: "/image-cropping/",
  path: "/redux-cropper/",
}

const Thing = () => (
  <div>Hello World</div>
)

Thing.propTypes = {
  route: React.PropTypes.object,
}
Thing.metadata = () => metadata
export default Thing
