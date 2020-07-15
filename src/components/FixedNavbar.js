import React from 'react'
import { createUseStyles } from 'react-jss'
import { string } from 'prop-types'
import clsx from 'clsx'
import { Link } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'

import { color, lightTheme, widthLessThan, breakpoints } from '../lib/theme'
import useCommonData from '../hooks/use-common-data'

import Img from './Img'
import withRootTheme from './withRootTheme'

const useStyles = createUseStyles( ( { font } ) => ( {
  navbar: {
    background: color.lightGrey,
    position: 'relative',
  },
  strip: {
    margin: 0,
    background: color.green,
    height: '10px',
    border: 'none',
  },
  items: {
    display: 'flex',
    justifyContent: 'center',
  },
  optional: {
    [ widthLessThan( breakpoints.tablet ) ]: {
      display: 'none',
    },
  },
  persona: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '2px',
    margin: '17px',
    [ widthLessThan( breakpoints.tablet ) ]: {
      display: 'none',
    },
  },
  profilePicture: {
    borderRadius: '100px',
    width: '35px',
    height: '35px',
  },
  name: {
    [ widthLessThan( breakpoints.laptop ) ]: {
      display: 'none',
    },
    margin: 0,
    marginLeft: '20px',
    color: color.green,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    fontSize: '22px',
    '& > strong:after': { content: "' '" },
  },
  item: {
    color: color.white,
    padding: '15px 20px',
    textTransform: 'uppercase',
    fontSize: '20px',
    fontFamily: font.header,
    textDecoration: 'none',
    cursor: 'pointer',
  },
  active: {
    fontWeight: 'bold',
  },
} ) )

const transitionProps = {
  entry: { length: 0.7 },
  exit: { length: 0.7 },
}

const items = [
  [ 'Home', '/#home', TransitionLink, true ],
  [ 'About', '/#about', TransitionLink ],
  [ 'Projects', '/projects', Link, true ],
  [ 'Contact', '/#contact', TransitionLink ],
  [ 'Blog', '/blog', Link, true ],
]

const Navbar = ( { active } ) => {
  const classes = useStyles()

  const { name, profilePicture } = useCommonData()
  const [ firstName, lastName ] = name.split( ' ' )

  return (
    <nav
      className={classes.navbar}
      role="navigation"
      aria-label="main-navigation"
    >
      <hr className={classes.strip} />

      <div className={classes.persona}>
        <Img className={classes.profilePicture} src={profilePicture} />
        <h3 className={classes.name}>
          <strong>{firstName}</strong>
          {lastName}
        </h3>
      </div>

      <div className={classes.items}>
        {items.map( ( [ name, to, LinkComponent, required ] ) => (
          <LinkComponent
            {...transitionProps}
            key={name}
            to={to}
            className={clsx(
              classes.item,
              {
                [ classes.active ]: active === name.toLowerCase(),
                [ classes.optional ]: !required,
              },
            )}
          >
            {name}
          </LinkComponent>
        ) )}
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  active: string,
}

Navbar.defaultProps = {
  active: null,
}

export default withRootTheme( lightTheme )( Navbar )
