import React from 'react'
import { createUseStyles } from 'react-jss'
import { bool, node, string } from 'prop-types'
import clsx from 'clsx'
import { color } from '../lib/theme'

const useStyles = createUseStyles( {
  chip: {
    color: color.white,
    fontWeight: 'bold',
    transition: '0.3s all ease-in-out',
    padding: '0.5em 1.25em',
    margin: '0.5em',
    fontSize: '1.25em',
    borderRadius: '100em',
    background: ( { active } ) => ( active ? color.green : color.darkGrey ),
  },
} )

const Chip = ( { className, active, children } ) => {
  const classes = useStyles( { active } )

  return <div className={clsx( classes.chip, className )}>{children}</div>
}

Chip.propTypes = {
  className: string,
  active: bool,
  children: node,
}

Chip.defaultProps = {
  className: null,
  active: false,
  children: null,
}

export default Chip
