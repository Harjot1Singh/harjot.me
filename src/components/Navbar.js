import React, { useEffect } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Link } from 'react-scroll'
import { createUseStyles } from 'react-jss'
import useScrollPosition from '@react-hook/window-scroll'
import { animated, useSpring } from 'react-spring'

const useStyles = createUseStyles( ( { color, font } ) => ( {
  navbar: {
    position: 'fixed',
    top: '10px',
    right: '20px',
    display: 'flex',
    fontSize: '16px',
    borderRadius: '100px',
  },
  item: {
    padding: '20px 50px',
    textTransform: 'uppercase',
    fontSize: '32px',
    color: color.primary,
    fontFamily: font.header,
    textDecoration: 'none',
    '&:hover': {
      color: color.secondary,
    },
  },
  active: {
    fontWeight: 'bold',
  },
} ) )

const poppedInSpringConfig = { background: 'rgba(0, 0, 0, 0)' }
const floatingSpringConfig = { background: 'rgba(94, 93, 98, 0.9)' }

const items = [
  [ 'Home', ( props ) => <Link {...props} to="home" href="#home" /> ],
  [ 'About', Link ],
  [ 'Projects', Link ],
  [ 'Contact', Link ],
  [ 'Blog', GatsbyLink ],
]

const Navbar = () => {
  const threshold = useScrollPosition() > 2

  const [ props, setProps ] = useSpring( () => poppedInSpringConfig )

  useEffect( () => {
    setProps( threshold ? floatingSpringConfig : poppedInSpringConfig )
  }, [ threshold, setProps ] )

  const classes = useStyles( {} )

  return (
    <animated.nav
      style={props}
      className={classes.navbar}
      role="navigation"
      aria-label="main-navigation"
    >
      {items.map( ( [ name, Link ] ) => (
        <Link className={classes.item}>
          {name}
        </Link>
      ) )}
    </animated.nav>
  )
}

export default Navbar
