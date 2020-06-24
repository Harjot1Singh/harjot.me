import { graphql, useStaticQuery } from 'gatsby'

import getRemarkProps from '../lib/get-remark-props'

const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "blog-post" } } } ) {
      distinct(field: frontmatter___tags)
    }
  }
`

const useBlogTags = () => {
  const { distinct } = getRemarkProps( useStaticQuery( query ) )
  return distinct
}

export default useBlogTags
