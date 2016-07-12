import React from 'react'
import { Link } from 'react-router'
import { link } from 'gatsby-helpers'
import { config } from 'config'

/* eslint-disable arrow-body-style */
const Teaser = ({ path, author, date, image, title, tags }) => {
  // console.log(path, image)
  return (
    <article className="Teaser">
      <Link to={link(path)}>
        <h1>{title}</h1>
        { image &&
          <img src={link(image)} alt={title} />
        }
        <span className="date">{date}</span>
        <span className="byline">{author}</span>
        { tags &&
          <span className="tags">
            { tags.map((tag, i) => <span key={i} className="tag">{tag}</span>) }
          </span>
        }
      </Link>
    </article>
  )
}

Teaser.propTypes = {
  author: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  image: React.PropTypes.string,
  path: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  tags: React.PropTypes.array.isRequired,
}
Teaser.defaultProps = {
  author: config.author,
}

export { Teaser }
