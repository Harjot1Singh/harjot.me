import React from 'react'
import { createUseStyles } from 'react-jss'
import { bool, string } from 'prop-types'
import clsx from 'clsx'

const useStyles = createUseStyles( ( { background, color } ) => ( {
  outerBackground: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundColor: ( { outsideDark } ) => ( outsideDark ? background.dark : background.light ),
  },
  innerBackground: {
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '-1%',
    right: '-1%',
    backgroundColor: ( { insideDark } ) => ( insideDark ? background.dark : background.light ),
    borderRadius: ( { borderRadius } ) => borderRadius,
    border: `6px solid ${color.secondary}`, // Todo: replace with gradient https://css-tricks.com/examples/GradientBorder/
  },
} ) )

const SectionBackground = ( { className, outsideDark, insideDark, borderRadius } ) => {
  const classes = useStyles( { outsideDark, insideDark, borderRadius } )

  return (
    <div className={classes.outerBackground}>
      <div className={clsx( classes.innerBackground, className )} />
    </div>
  )
}

SectionBackground.propTypes = {
  className: string,
  outsideDark: bool,
  insideDark: bool,
  borderRadius: string,
  height: string,
}

SectionBackground.defaultProps = {
  className: null,
  outsideDark: false,
  insideDark: false,
  borderRadius: '0px',
  height: 'auto',
}

export default SectionBackground
