import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import withRemarkProps from '../components/withRemarkProps'

export const HomeSectionTemplate = ( { name, roles, profilePicture, cv, iconLinks } ) => (
  <section className="section section--gradient">
    {name}
  </section>
)

HomeSectionTemplate.propTypes = {
  name: string,
  roles: arrayOf( string ),
  profilePicture: string,
  cv: shape( { publicURL: string } ),
  iconLinks: arrayOf( shape( { url: string, icon: shape( { publicURL: string } ) } ) ),
}

HomeSectionTemplate.defaultProps = {
  name: null,
  roles: [],
  profilePicture: null,
  cv: null,
  iconLinks: [],
}

const query = graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "home-section"}}) {
      frontmatter {
        name
        roles
        profilePicture {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        cv {
          publicURL
        }
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
    render={withRemarkProps( HomeSectionTemplate, props )}
  />
)
