import React from 'react'
import { node, string } from 'prop-types'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

const useStyles = createUseStyles( {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '70vw',
    alignItems: 'center',
    margin: 'auto',
    position: 'relative',
  },
} )

const Container = ( { className, children } ) => {
  const classes = useStyles()

  return <div className={clsx( classes.root, className )}>{children}</div>
}

Container.propTypes = {
  className: string,
  children: node.isRequired,
}

Container.defaultProps = {
  className: null,
}

export default Container
