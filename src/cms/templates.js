import React from 'react'

import { darkTheme, lightTheme } from '../lib/theme'
import withRootTheme from '../components/withRootTheme'

import { HomeSectionTemplate } from '../templates/home-section'
import { AboutSectionTemplate } from '../templates/about-section'
import { ProjectSectionTemplate } from '../templates/projects-section'
import { ContactSectionTemplate } from '../templates/contact-section'

import { ProjectPostTemplate } from '../templates/project-post'
import { BlogPostTemplate } from '../templates/blog-post'

const mockCommonData = {
  name: 'Harjot Singh',
}

export default [
  { name: 'common', Template: HomeSectionTemplate },
  { name: 'home-section', Template: HomeSectionTemplate },
  { name: 'about-section', Template: AboutSectionTemplate },
  { name: 'projects-section', Template: ProjectSectionTemplate },
  { name: 'contact-section', Template: ContactSectionTemplate },
  { name: 'projects', Template: ProjectPostTemplate, theme: lightTheme },
  { name: 'blog', Template: BlogPostTemplate, theme: lightTheme },
]
  .map( ( { Template, theme, ...rest } ) => ( {
    ...rest,
    Template: withRootTheme( theme || darkTheme )( Template ),
  } ) )
  .map( ( { Template, ...rest } ) => ( {
    Template: ( props ) => <Template {...mockCommonData} {...props} />,
    ...rest,
  } ) )
