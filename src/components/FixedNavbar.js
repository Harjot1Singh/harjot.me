import React from 'react'
import { Link } from 'gatsby'
import { createUseStyles } from 'react-jss'
import { string } from 'prop-types'
import clsx from 'clsx'

import { color } from '../lib/theme'
import useCommonData from '../hooks/use-common-data'

import Img from './Img'

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
  persona: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: '100px',
    top: '2px',
  },
  profilePicture: {
    borderRadius: '100px',
    width: '35px',
    height: '35px',
  },
  name: {
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

const items = [
  [ 'Home', '/#home' ],
  [ 'About', '/#about' ],
  [ 'Projects', '/projects' ],
  [ 'Contact', '/#contact' ],
  [ 'Blog', '/blog' ],
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
        {items.map( ( [ name, to ] ) => (
          <Link
            key={name}
            to={to}
            className={clsx( classes.item, { [ classes.active ]: active === name.toLowerCase() } )}
          >
            {name}
          </Link>
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

export default Navbar
