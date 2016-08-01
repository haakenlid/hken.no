import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { config } from 'config'
import { TimeIcon, TagIcon, BylineIcon } from 'components/icons'

const DateLine = ({ date }) => (
  <span className="DateLine" > <TimeIcon /> {moment(date).fromNow()} </span>
)
const ByLine = ({ name = config.authorName }) => (
  <span className="ByLine" > <BylineIcon /> {name} </span>
)
const Tags = ({ tags }) => (
  <span className="Tags" > <TagIcon /> {tags.join(', ')} </span>
)
DateLine.propTypes = { date: React.PropTypes.string.isRequired }
ByLine.propTypes = { name: React.PropTypes.string }
Tags.propTypes = { tags: React.PropTypes.array.isRequired }

const BlogPostData = props => (
  <div className="BlogPostData">
    <ByLine {...props} />
    <DateLine {...props} />
    <Tags {...props} />
  </div>
)

const Teaser = ({ image, title = 'Untitled', path, data = false, ...props }) => {
  return (
    <article className="Teaser">
      {data && <BlogPostData {...props} />}
      <Link to={link(path)}>
        {image && <img src={link(image)} alt={title} />}
        <h1>{title}</h1>
      </Link>
    </article>
  )
}

Teaser.propTypes = {
  image: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  data: React.PropTypes.bool.isRequired,
}

export { Teaser, BlogPostData }
