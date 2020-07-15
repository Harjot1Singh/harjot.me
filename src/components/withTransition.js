import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import { useTransitionState } from 'gatsby-plugin-transition-link/hooks'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles( {
  root: {
    position: 'absolute',
    width: '100%',
  },
} )

const springTransition = {
  from: { transform: 'translateX(100%)' },
  enter: { transform: 'translateX(0%)' },
  leave: { transform: 'translateX(100%)' },
}

const withTransition = ( Component ) => ( componentProps ) => {
  const { current, mount } = useTransitionState()

  const transitions = useTransition( mount, null, {
    ...springTransition,
    config: {
      duration: current.length * 1000 - 200,
      easing: ( x ) => 1 - ( 1 - x ) * ( 1 - x ),
    },
  } )

  const classes = useStyles()

  return transitions.map( ( { item, props } ) => item && (
    <animated.div key className={classes.root} style={props}>
      <Component {...componentProps} />
    </animated.div>
  ) )
}

export default withTransition
