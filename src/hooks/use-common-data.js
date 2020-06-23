import { graphql, useStaticQuery } from 'gatsby'

import getRemarkProps from '../lib/get-remark-props'

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

const useCommonData = () => getRemarkProps( useStaticQuery( query ) )

export default useCommonData
