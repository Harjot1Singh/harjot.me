import { HomeSectionTemplate } from '../templates/home-section'
import { AboutPageTemplate } from '../templates/about-section'
// import {ProjectsSectionPreview} from '../templates/projects-section'
// import ContactSectionPreview from '../templates/contact-section'

// import ProjectPostPreview from './preview-templates/ProjectPostPreview'
import { BlogPostTemplate } from '../templates/blog-post'

export default [
  { name: 'home-section', Template: HomeSectionTemplate },
  { name: 'about-section', Template: AboutPageTemplate },
  { name: 'projects-section', Template: HomeSectionTemplate },
  { name: 'contact-section', Template: HomeSectionTemplate },
  { name: 'projects', Template: BlogPostTemplate },
  { name: 'blog', Template: BlogPostTemplate },
]
