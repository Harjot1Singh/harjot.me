import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'
import { createUseStyles } from 'react-jss'

import Chip from './Chip'

const useStyles = createUseStyles( ( { color } ) => ( {
  image: {
    width: '100%',
    height: '25vh',
    borderRadius: '10px',
  },
  post: {
    fontSize: '22px',
    lineHeight: '1.5em',
    textDecoration: 'none',
  },
  title: {
    fontSize: '48px',
    lineHeight: '1.2em',
    margin: '0',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  date: {
    color: color.secondary,
    marginBottom: '15px',
  },
  tags: {
    display: 'flex',
    width: '100%',
    fontSize: '0.8em',
  },
  tag: {
    background: color.secondary,
  },
} ) )

const BlogExcerpt = ( { slug, image, date, title, excerpt, tags } ) => {
  const classes = useStyles()

  return (
    <span>
      <Link className={classes.post} to={slug}>
        <Img className={classes.image} {...image.childImageSharp} fadeIn />
        <h3 className={classes.date}>{date}</h3>
        <h2 className={classes.title}>{title}</h2>
        <p>{excerpt}</p>
      </Link>

      <div className={classes.tags}>
        {tags.map( ( tag ) => (
          <Link key={tag} to={`/tags/${kebabCase( tag )}`}>
            <Chip className={classes.tag}>{tag}</Chip>
          </Link>
        ) )}
      </div>
    </span>
  )
}

BlogExcerpt.propTypes = {
  slug: string.isRequired,
  image: shape( { childImageSharp: shape( {} ) } ),
  date: string.isRequired,
  title: string.isRequired,
  excerpt: string.isRequired,
  tags: arrayOf( string ),
}

BlogExcerpt.defaultProps = {
  image: {},
  tags: [],
}

export default BlogExcerpt
