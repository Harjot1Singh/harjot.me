import { graphql, useStaticQuery } from 'gatsby'

import getRemarkProps from '../lib/get-remark-props'

const query = graphql`
  {
    allMarkdownRemark(limit: 1000, filter: { frontmatter: { templateKey: { eq: "blog-post" } } } ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`

const useBlogTags = () => {
  const { items } = getRemarkProps( useStaticQuery( query ) )

  return Array.from( new Set( items.reduce( ( acc, { tags } ) => [ ...acc, ...tags ], [] ) ) )
}

export default useBlogTags
