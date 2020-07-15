import React, { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

import { darkTheme } from '../lib/theme'
import Navbar from '../components/FloatingNavbar'
import HomeSection from '../templates/home-section'
import AboutSection from '../templates/about-section'
import ProjectsSection from '../templates/projects-section'
import ContactSection from '../templates/contact-section'
import withRootTheme from '../components/withRootTheme'
import Header from '../components/Header'
import withTransition from '../components/withTransition'

const sections = [
  [ HomeSection, 'home' ],
  [ AboutSection, 'about' ],
  [ ProjectsSection, 'projects' ],
  [ ContactSection, 'contact' ],
]

const Index = () => {
  const [ active, setActive ] = useState( sections[ 0 ][ 1 ] )

  const onVisibilityChange = ( name ) => ( visible ) => visible && setActive( name )

  return (
    <main>
      <Header />

      <Navbar active={active} />

      {sections.map( ( [ Section, name ] ) => (
        <VisibilitySensor key={name} onChange={onVisibilityChange( name )}>
          <Section id={name} onVisible={() => setActive( name )} />
        </VisibilitySensor>
      ) )}
    </main>
  )
}

export default withRootTheme( darkTheme )( withTransition( Index ) )
