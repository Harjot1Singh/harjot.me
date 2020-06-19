import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import withRemarkProps from './withRemarkProps'

const query = graphql`
  {
    markdownRemark(fileAbsolutePath: {glob: "**/*common.md"}) {
      frontmatter {
        name
        profilePicture {
          childImageSharp {
            fixed(quality: 100) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
        github
        linkedin
        email
      }
    }
  }
`

const withCommonData = ( Component ) => ( props ) => (
  <StaticQuery
    query={query}
    render={withRemarkProps( Component, props )}
  />
)

export default withCommonData
