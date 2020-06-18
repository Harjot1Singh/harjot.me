import React from 'react'

import Layout from '../components/Layout'
import HomeSection from '../templates/home-section'
import AboutSection from '../templates/about-section'
import ProjectsSection from '../templates/projects-section'
import ContactSection from '../templates/contact-section'

const sections = [
  HomeSection,
  AboutSection,
  ProjectsSection,
  ContactSection,
]

const Index = () => (
  <Layout>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {sections.map( ( Section, index ) => <Section key={index} /> )}
  </Layout>
)

export default Index
