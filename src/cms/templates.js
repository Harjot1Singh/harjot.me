import { HomeSectionTemplate } from '../templates/home-section'
import { AboutSectionTemplate } from '../templates/about-section'
import { ProjectSectionTemplate } from '../templates/projects-section'
import { ContactSectionTemplate } from '../templates/contact-section'

import { ProjectPostTemplate } from '../templates/project-post'
import { BlogPostTemplate } from '../templates/blog-post'

export default [
  { name: 'home-section', Template: HomeSectionTemplate },
  { name: 'about-section', Template: AboutSectionTemplate },
  { name: 'projects-section', Template: ProjectSectionTemplate },
  { name: 'contact-section', Template: ContactSectionTemplate },
  { name: 'projects', Template: ProjectPostTemplate },
  { name: 'blog', Template: BlogPostTemplate },
]
