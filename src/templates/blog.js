import React from 'react'
import { shape } from 'prop-types'
import { createUseStyles } from 'react-jss'
import { graphql } from 'gatsby'

import { lightTheme, color, widthLessThan, breakpoints } from '../lib/theme'
import getRemarkProps from '../lib/get-remark-props'

import useBlogTags from '../hooks/use-blog-tags'
import useSiteMetadata from '../hooks/use-site-metadata'

import Container from '../components/Container'
import withRootTheme from '../components/withRootTheme'
import Navbar from '../components/FixedNavbar'
import Pager from '../components/Pager'
import BlogExcerpt from '../components/BlogExcerpt'
import Filters from '../components/Filters'
import Header from '../components/Header'
import withTransition from '../components/withTransition'

const useStyles = createUseStyles( {
  container: {
    maxWidth: '50vw',
    margin: '80px auto',
    [ widthLessThan( breakpoints.laptop ) ]: {
      maxWidth: '90vw',
    },
  },
  separator: {
    background: color.lightGrey,
    height: '2px',
    width: '35%',
    border: 'none',
    margin: '100px 0',
  },
} )

const Blog = ( { data, pageContext } ) => {
  const { items } = getRemarkProps( data )

  const { title } = useSiteMetadata()
  const tags = useBlogTags()

  const classes = useStyles()

  return (
    <main>
      <Header title={`${title} | Blog`} />

      <Navbar active="blog" />

      <Container className={classes.container}>

        <Filters prefix="/blog" tags={tags} />

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
  query ($skip: Int!, $limit: Int!, $tags: [String]!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" }, tags: { in: $tags } } }
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
            date(formatString: "MMMM D, YYYY")
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

export default withRootTheme( lightTheme )( withTransition( Blog ) )
