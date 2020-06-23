import React from 'react'
import { shape } from 'prop-types'
import { createUseStyles } from 'react-jss'
import { graphql } from 'gatsby'

import { lightTheme } from '../lib/theme'
import getRemarkProps from '../lib/get-remark-props'
import Container from '../components/Container'
import withRootTheme from '../components/withRootTheme'
import Navbar from '../components/FixedNavbar'
import Pager from '../components/Pager'
import BlogExcerpt from '../components/BlogExcerpt'

const useStyles = createUseStyles( ( { color } ) => ( {
  container: {
    maxWidth: '40vw',
    margin: '80px auto',
  },
  separator: {
    background: color.secondary,
    height: '2px',
    width: '35%',
    border: 'none',
    margin: '100px 0',
  },
} ) )

const Blog = ( { data, pageContext } ) => {
  const { items } = getRemarkProps( data )

  const classes = useStyles()

  return (
    <main>
      <Navbar active="blog" />

      <Container className={classes.container}>

        {items
          .map( BlogExcerpt )
          .reduce( ( prev, curr, index ) => [
            prev,
            // eslint-disable-next-line react/no-array-index-key
            <hr className={classes.separator} key={index} />,
            curr,
          ] )}

        <Pager {...pageContext} />

      </Container>
    </main>
  )
}

Blog.propTypes = {
  data: shape( {} ).isRequired,
  pageContext: shape( {} ).isRequired,
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt(pruneLength: 200)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            image {
              childImageSharp {
               fluid(quality: 100, maxWidth: 1000) {
                 ...GatsbyImageSharpFluid
               }
              }
            }
          }
        }
      }
    }
  }
`

export default withRootTheme( lightTheme )( Blog )