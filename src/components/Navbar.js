import React, { useEffect } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link } from 'react-scroll'
import { createUseStyles } from 'react-jss'
import useScrollPosition from '@react-hook/window-scroll'
import { animated, useSpring } from 'react-spring'
import { bool, string } from 'prop-types'
import clsx from 'clsx'

const useStyles = createUseStyles( ( { font } ) => ( {
  navbar: {
    position: ( { floating } ) => ( floating ? 'fixed' : 'relative' ),
    display: 'flex',
    zIndex: 1,
    right: 0,
    float: 'right',
    margin: '10px 20px',
    borderRadius: '100px',
  },
  item: {
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

const items = [
  [ 'Home', ( props ) => <Link {...props} to="home" smooth /> ],
  [ 'About', ( props ) => <Link {...props} to="about" smooth /> ],
  [ 'Projects', ( props ) => <GatsbyLink {...props} to="projects" /> ],
  [ 'Contact', ( props ) => <Link {...props} to="contact" smooth /> ],
  [ 'Blog', ( props ) => <GatsbyLink {...props} to="blog" /> ],
]

const Navbar = ( { floating, active } ) => {
  const threshold = useScrollPosition() > 2

  const [ props, setProps ] = useSpring( () => poppedInSpringConfig )

  useEffect( () => {
    setProps( threshold ? floatingSpringConfig : poppedInSpringConfig )
  }, [ threshold, setProps ] )

  const classes = useStyles( { floating } )

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
  floating: bool,
  active: string,
}

Navbar.defaultProps = {
  floating: false,
  active: null,
}

export default Navbar
