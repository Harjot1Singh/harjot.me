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
            fluid(quality: 100, maxWidth: 400, maxHeight: 400) {
              ...GatsbyImageSharpFluid_tracedSVG
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
