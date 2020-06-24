import React from 'react'
import { arrayOf, string } from 'prop-types'
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import { kebabCase } from 'lodash'
import { Link } from 'gatsby'

import Chip from './Chip'

const useStyles = createUseStyles( ( { color } ) => ( {
  tags: {
    display: 'flex',
    width: '100%',
    fontSize: '0.8em',
    '& > :first-child > div': {
      marginLeft: 0,
    },
  },
  tag: {
    background: color.secondary,
  },
} ) )

const Tags = ( { className, tags, prefix } ) => {
  const classes = useStyles()

  return (
    <div className={clsx( classes.tags, className )}>
      {tags.map( ( tag ) => (
        <Link key={tag} to={`${prefix}/${kebabCase( tag )}`}>
          <Chip className={classes.tag}>{tag}</Chip>
        </Link>
      ) )}
    </div>
  )
}

Tags.propTypes = {
  className: string,
  prefix: string.isRequired,
  tags: arrayOf( string ).isRequired,
}

Tags.defaultProps = {
  className: null,
}

export default Tags
