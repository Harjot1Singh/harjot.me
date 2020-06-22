import React from 'react'
import { createUseStyles } from 'react-jss'
import { bool, string } from 'prop-types'
import clsx from 'clsx'
import { useSpring, animated } from 'react-spring'

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
    margin: '6px',
    backgroundColor: ( { insideDark } ) => ( insideDark ? background.dark : background.light ),
    borderRadius: ( { borderRadius } ) => borderRadius,
  },
  border: {
    borderRadius: 'inherit',
    zIndex: -1,
    position: 'absolute',
    top: '-1%',
    left: '-5px',
    right: '-5px',
    bottom: '-5px',
    background: `linear-gradient(to top right, ${color.secondary}, transparent)`,
  },
} ) )

const borderSpringConfig = {
  from: { margin: '20px' },
  to: { margin: '0px' },
}

const SectionBackground = ( { className, outsideDark, insideDark, borderRadius } ) => {
  const classes = useStyles( { outsideDark, insideDark, borderRadius } )

  const [ borderProps ] = useSpring( () => borderSpringConfig )

  return (
    <div className={classes.outerBackground}>
      <div className={clsx( classes.innerBackground, className )}>
        <animated.div className={classes.border} style={borderProps} />
      </div>
    </div>
  )
}

SectionBackground.propTypes = {
  className: string,
  outsideDark: bool,
  insideDark: bool,
  borderRadius: string,
}

SectionBackground.defaultProps = {
  className: null,
  outsideDark: false,
  insideDark: false,
  borderRadius: '0px',
}

export default SectionBackground
