import React, { useEffect } from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'
import { Link } from 'react-scroll'
import { createUseStyles } from 'react-jss'
import useScrollPosition from '@react-hook/window-scroll'
import { animated, useSpring } from 'react-spring'
import { string } from 'prop-types'
import clsx from 'clsx'

import { color } from '../lib/theme'

const useStyles = createUseStyles( ( { font } ) => ( {
  navbar: {
    position: 'fixed',
    display: 'flex',
    zIndex: 1,
    right: 0,
    float: 'right',
    margin: '10px 20px',
    borderRadius: '100px',
  },
  item: {
    color: color.white,
    padding: '1.5vw 2.5vw',
    textTransform: 'uppercase',
    fontSize: '28px',
    fontFamily: font.header,
    textDecoration: 'none',
    cursor: 'pointer',
    letterSpacing: 0,
  },
  active: {
    letterSpacing: '5px',
    fontWeight: 'bold',
  },
} ) )

const poppedInSpringConfig = { background: 'rgba(0, 0, 0, 0)' }
const floatingSpringConfig = { background: 'rgba(94, 93, 98, 0.9)' }

const transitionProps = {
  entry: { length: 0.7 },
  exit: { length: 0.7 },
}

const items = [
  [ 'Home', ( props ) => <Link {...props} to="home" smooth /> ],
  [ 'About', ( props ) => <Link {...props} to="about" smooth /> ],
  [ 'Projects', ( props ) => <TransitionLink {...props} {...transitionProps} to="projects" /> ],
  [ 'Contact', ( props ) => <Link {...props} to="contact" smooth /> ],
  [ 'Blog', ( props ) => <TransitionLink {...props} {...transitionProps} to="blog" /> ],
]

const Navbar = ( { active } ) => {
  const threshold = useScrollPosition() > 2

  const [ props, setProps ] = useSpring( () => poppedInSpringConfig )

  useEffect( () => {
    setProps( threshold ? floatingSpringConfig : poppedInSpringConfig )
  }, [ threshold, setProps ] )

  const classes = useStyles()

  return (
    <animated.nav
      style={props}
      className={classes.navbar}
      role="navigation"
      aria-label="main-navigation"
    >
      {items.map( ( [ name, LinkComponent ] ) => (
        <LinkComponent
          key={name}
          className={clsx( classes.item, { [ classes.active ]: active === name.toLowerCase() } )}
        >
          {name}
        </LinkComponent>
      ) )}
    </animated.nav>
  )
}

Navbar.propTypes = {
  active: string,
}

Navbar.defaultProps = {
  active: null,
}

export default Navbar
