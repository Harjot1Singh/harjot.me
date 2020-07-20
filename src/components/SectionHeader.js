import React from 'react'
import { node } from 'prop-types'
import { createUseStyles } from 'react-jss'
import { widthLessThan, breakpoints } from '../lib/theme'

const useStyles = createUseStyles( ( { color } ) => ( {
  header: {
    textTransform: 'uppercase',
    color: color.secondary,
    width: '100%',
    fontSize: '40px',
    [ widthLessThan( breakpoints.tablet ) ]: {
      fontSize: '32px',
    },
  },
} ) )

const SectionHeader = ( { children } ) => {
  const classes = useStyles()

  return <h1 className={classes.header}>{children}</h1>
}

SectionHeader.propTypes = {
  children: node,
}

SectionHeader.defaultProps = {
  children: null,
}

export default SectionHeader
