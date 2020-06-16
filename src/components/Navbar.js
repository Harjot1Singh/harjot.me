import React, { useState } from 'react'
import { Link } from 'gatsby'
import clsx from 'clsx'

const Navbar = () => {
  const [ active, setActive ] = useState( false )
  const [ navbarClass, setNavbarClass ] = useState( '' )

  const toggleHamburger = () => {
    setActive( !active )
    setNavbarClass( !active ? 'is-active' : '' )
  }

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo" />
          {/* Hamburger menu */}
          <div
            className={clsx( 'navbar-burger burger', navbarClass )}
            data-target="navMenu"
            onClick={toggleHamburger}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${navbarClass}`}
        >
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/products">
              Products
            </Link>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
            <Link className="navbar-item" to="/contact/examples">
              Form Examples
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
