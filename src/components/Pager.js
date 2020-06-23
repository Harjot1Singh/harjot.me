import React from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'gatsby'
import { string, number } from 'prop-types'

const useStyles = createUseStyles( ( {
  pages: {
    position: 'relative',
    marginTop: '70px',
    width: '100%',
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
  nextPage: {
    position: 'absolute',
    right: 0,
    textDecoration: 'none',
  },
  previousPage: {
    position: 'absolute',
    left: 0,
    textDecoration: 'none',
  },
} ) )

const Pager = ( { previousPagePath, nextPagePath } ) => {
  const classes = useStyles()

  return (
    <div className={classes.pages}>

      {previousPagePath && (
      <Link className={classes.previousPage} to={previousPagePath}>
        ‹ Previous Page
      </Link>
      )}

      {nextPagePath && (
        <Link className={classes.nextPage} to={nextPagePath}>
          Next Page ›
        </Link>
      )}

    </div>
  )
}

Pager.propTypes = {
  previousPagePath: string,
  nextPagePath: string,
}

Pager.defaultProps = {
  previousPagePath: null,
  nextPagePath: null,
}

export default Pager
