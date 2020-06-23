import React from 'react'
import { createUseStyles } from 'react-jss'
import { bool, node } from 'prop-types'
import { color } from '../lib/theme'

const useStyles = createUseStyles( {
  chip: {
    color: color.white,
    fontWeight: 'bold',
    transition: '0.3s all ease-in-out',
    padding: '10px 20px',
    margin: '5px',
    fontSize: '20px',
    borderRadius: '100px',
    background: ( { active } ) => ( active ? color.green : color.darkGrey ),
  },
} )

const Chip = ( { active, children } ) => {
  const classes = useStyles( { active } )

  return <div className={classes.chip}>{children}</div>
}

Chip.propTypes = {
  active: bool,
  children: node,
}

Chip.defaultProps = {
  active: false,
  children: null,
}

export default Chip
