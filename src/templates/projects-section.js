import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import withRemarkProps from '../components/withRemarkProps'

export const ProjectSectionTemplate = ( { name, roles, profilePicture, cv, iconLinks } ) => (
  <section className="section section--gradient">
    {name}
  </section>
)

ProjectSectionTemplate.propTypes = {
  name: string,
  roles: arrayOf( string ),
  profilePicture: string,
  iconLinks: arrayOf( shape( { url: string, icon: string } ) ),
}
ProjectSectionTemplate.defaultProps = {
  name: null,
  roles: [],
  profilePicture: null,
  iconLinks: [],
}

const query = graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "projects-section"}}) {
      html
      frontmatter {
        name
      }
    }
  }
`

export default ( props ) => (
  <StaticQuery
    query={query}
    render={withRemarkProps( ProjectSectionTemplate, props )}
  />
)
