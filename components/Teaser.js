import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { config } from 'config'
import {
  BasicWatch as TimeIcon,
  EcommerceSales as TagIcon,
  SoftwarePen as BylineIcon,
} from 'components/lineicons'

const DateLine = ({ date }) => (
  <span className="DateLine" > <TimeIcon /> { moment(date).fromNow() } </span>
)
const ByLine = ({ name }) => (
  <span className="ByLine" > <BylineIcon /> { name || config.authorName } </span>
)
const Tags = ({ tags }) => (
  <span className="Tags" > <TagIcon /> { tags.join(', ') } </span>
)
DateLine.propTypes = { date: React.PropTypes.string.isRequired }
ByLine.propTypes = { name: React.PropTypes.string.isRequired }
Tags.propTypes = { tags: React.PropTypes.array.isRequired }

const BlogPostData = props => (
  <div className="BlogPostData">
    <ByLine {...props} />
    <DateLine {...props} />
    <Tags {...props} />
  </div>
)

const Teaser = (props) => {
  const { image, title, path } = props
  return (
    <article className="Teaser">
      <BlogPostData {...props} />
      <Link to={link(path)}>
        <h1>{title}</h1>
        { image && <img src={link(image)} alt={title} /> }
      </Link>
    </article>
  )
}

Teaser.propTypes = {
  path: React.PropTypes.string.isRequired,
  image: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
}

export { Teaser, BlogPostData }
