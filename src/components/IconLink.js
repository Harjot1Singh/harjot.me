import React from 'react'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import { string, node } from 'prop-types'

const useStyles = createUseStyles( ( { color } ) => ( {
  root: {
    '& svg :first-child': {
      transition: '0.15s all ease-in-out',
    },
    '&:hover svg :first-child': {
      fill: color.secondary,
    },
  },
} ) )

const IconLink = ( { className, href, children } ) => {
  const classes = useStyles()

  return (
    <a className={clsx( classes.root, className )} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

IconLink.propTypes = {
  className: string,
  href: string,
  children: node,
}

IconLink.defaultProps = {
  className: null,
  href: null,
  children: null,
}

export default IconLink
