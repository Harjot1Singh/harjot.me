import React from 'react'
import { arrayOf, string } from 'prop-types'
import { kebabCase } from 'lodash'
import { createUseStyles } from 'react-jss'
import { Link } from 'gatsby'

import * as theme from '../lib/theme'

const useStyles = createUseStyles( ( { color } ) => ( {
  categories: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '-35vw',
  },
  item: {
    textDecoration: 'none',
    margin: '0.25em 0',
    color: color.secondary,
  },
  active: {
    color: theme.color.green,
  },
  header: {
    fontSize: '1em',
    textTransform: 'uppercase',
    color: color.secondary,
    marginBottom: '0.5em',
  },
} ) )

const TagLinks = ( { prefix, tags } ) => {
  const classes = useStyles()

  return (
    <div className={classes.categories}>
      <Link to={prefix} className={classes.item} activeClassName={classes.active}>All</Link>

      <h3 className={classes.header}>Tags</h3>

      {tags.map( ( tag ) => (
        <Link
          className={classes.item}
          key={tag}
          activeClassName={classes.active}
          to={`${prefix}/${kebabCase( tag )}`}
        >
          {tag}
        </Link>
      ) )}
    </div>
  )
}

TagLinks.propTypes = {
  prefix: string.isRequired,
  tags: arrayOf( string ).isRequired,
}

export default TagLinks
