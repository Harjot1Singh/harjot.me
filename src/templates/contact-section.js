import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import withRemarkProps from '../components/withRemarkProps'

export const ContactSectionTemplate = ( { name, roles, profilePicture, cv, iconLinks } ) => (
  <section className="section section--gradient">
    {name}
  </section>
)

ContactSectionTemplate.propTypes = {
  name: string,
  roles: arrayOf( string ),
  profilePicture: string,
  iconLinks: arrayOf( shape( { url: string, icon: string } ) ),
}
ContactSectionTemplate.defaultProps = {
  name: null,
  roles: [],
  profilePicture: null,
  iconLinks: [],
}

const query = graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "contact-section"}}) {
      html
      frontmatter {
        iconLinks {
          url
          icon {
            publicURL
          }
        }
      }
    }
  }
`

export default ( props ) => (
  <StaticQuery
    query={query}
    render={withRemarkProps( ContactSectionTemplate, props )}
  />
)
