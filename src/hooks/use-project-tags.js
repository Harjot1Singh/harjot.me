import { graphql, useStaticQuery } from 'gatsby'

import getRemarkProps from '../lib/get-remark-props'

const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "project-post" } } } ) {
      distinct(field: frontmatter___tags)
    }
  }
`

const useProjectTags = () => {
  const { distinct } = getRemarkProps( useStaticQuery( query ) )
  return distinct
}

export default useProjectTags
