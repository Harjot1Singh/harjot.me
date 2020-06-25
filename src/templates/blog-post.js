import React from 'react'
import { node, string, arrayOf, shape } from 'prop-types'
import { graphql } from 'gatsby'
import { createUseStyles } from 'react-jss'
import Img from 'gatsby-image'
import { Disqus } from 'gatsby-plugin-disqus'

import getRemarkProps from '../lib/get-remark-props'
import { lightTheme } from '../lib/theme'
import withRootTheme from '../components/withRootTheme'
import Header from '../components/Header'
import Container from '../components/Container'
import Navbar from '../components/FixedNavbar'
import Tags from '../components/Tags'
import PostContent from '../components/PostContent'

const useStyles = createUseStyles( ( { color } ) => ( {
  image: {
    width: '100%',
    margin: '2em 0',
  },
  container: {
    maxWidth: '40vw',
    margin: '80px auto',
    alignItems: 'flex-start',
    fontSize: '22px',
  },
  title: {
    fontSize: '48px',
    margin: 0,
    color: color.secondary,
  },
  date: {
    color: color.secondary,
    marginBottom: 0,
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
    color: color.secondary,
  },
  comments: {
    marginTop: '1em',
  },
} ) )

export const BlogPostTemplate = ( { title, date, html, description, image, tags, slug } ) => {
  const classes = useStyles()

  const disqusConfig = { identifier: slug, title }

  return (
    <main>
      <Header title={title} description={description} />
      <Navbar active="blog" />

      <Container className={classes.container}>
        <h1 className={classes.title}>{title}</h1>
        <h2 className={classes.date}>{date}</h2>
        <Img className={classes.image} {...image.childImageSharp} />

        <PostContent>{html}</PostContent>

        <footer className={classes.footer}>
          <h4 className={classes.tagsHeader}>Tags</h4>
          <Tags tags={tags} prefix="/blog" />

          <div className={classes.comments}>
            <Disqus config={disqusConfig} />
          </div>
        </footer>

      </Container>

    </main>
  )
}

BlogPostTemplate.propTypes = {
  html: node,
  title: string,
  date: string,
  description: string,
  tags: arrayOf( string ),
  image: shape( { childImageSharp: {} } ),
  slug: string.isRequired,
}

BlogPostTemplate.defaultProps = {
  html: null,
  title: null,
  date: null,
  description: null,
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
`

const BlogPost = ( { data } ) => {
  const Component = withRootTheme( lightTheme )( BlogPostTemplate )

  return <Component {...getRemarkProps( data )} />
}

BlogPost.propTypes = {
  data: shape( {} ).isRequired,
}

export default BlogPost

