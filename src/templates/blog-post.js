import React from 'react'
import { node, string, arrayOf, shape } from 'prop-types'
import { graphql } from 'gatsby'
import { createUseStyles } from 'react-jss'
import { Disqus } from 'gatsby-plugin-disqus'

import getRemarkProps from '../lib/get-remark-props'
import { lightTheme, color, breakpoints, widthLessThan } from '../lib/theme'
import withRootTheme from '../components/withRootTheme'
import Header from '../components/Header'
import Container from '../components/Container'
import Navbar from '../components/FixedNavbar'
import Tags from '../components/Tags'
import PostContent from '../components/PostContent'
import Img from '../components/Img'
import withTransition from '../components/withTransition'

const useStyles = createUseStyles( {
  container: {
    maxWidth: '768px',
    margin: '80px auto',
    alignItems: 'flex-start',
    fontSize: '22px',
    [ widthLessThan( breakpoints.laptop ) ]: {
      maxWidth: '90vw',
    },
    [ widthLessThan( breakpoints.tablet ) ]: {
      fontSize: '20px',
    },
  },
  image: {
    width: '100%',
    margin: '2em 0',
  },
  title: {
    fontSize: '48px',
    margin: 0,
    color: color.lightGrey,
  },
  date: {
    color: color.lightGrey,
    marginTop: '0.5em',
    fontSize: '1.15em',
  },
  footer: {
    fontSize: '18px',
    margin: '50px 0 0 0',
    width: '100%',
    alignItems: 'center',
  },
  tagsHeader: {
    marginBottom: '0.5em',
    textTransform: 'uppercase',
    color: color.lightGrey,
  },
  comments: {
    marginTop: '1em',
  },
} )

export const BlogPostTemplate = ( { title, date, html, image, tags, slug } ) => {
  const classes = useStyles()

  const disqusConfig = { identifier: slug, title }

  return (
    <Container className={classes.container}>
      <h1 className={classes.title}>{title}</h1>
      <h2 className={classes.date}>{date}</h2>
      <Img className={classes.image} src={image} />

      <PostContent>{html}</PostContent>

      <footer className={classes.footer}>
        <h4 className={classes.tagsHeader}>Tags</h4>
        <Tags tags={tags} prefix="/blog" />

        <div className={classes.comments}>
          <Disqus config={disqusConfig} />
        </div>
      </footer>

    </Container>
  )
}

BlogPostTemplate.propTypes = {
  html: node,
  title: string,
  date: string,
  tags: arrayOf( string ),
  image: shape( { childImageSharp: {} } ),
  slug: string.isRequired,
}

BlogPostTemplate.defaultProps = {
  html: null,
  title: null,
  date: null,
  tags: [],
  image: {},
}

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
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
`

const BlogPost = ( { data } ) => {
  const Component = withRootTheme( lightTheme )( BlogPostTemplate )
  const remarkProps = getRemarkProps( data )

  return (
    <main>
      <Header title={remarkProps.title} description={remarkProps.excerpt} />
      <Navbar active="blog" />
      <Component {...remarkProps} />
    </main>
  )
}

BlogPost.propTypes = {
  data: shape( {} ).isRequired,
}

export default withTransition( BlogPost )

