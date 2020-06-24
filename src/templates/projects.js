import React from 'react'
import { shape } from 'prop-types'
import { createUseStyles } from 'react-jss'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import { lightTheme } from '../lib/theme'
import getRemarkProps from '../lib/get-remark-props'

import useProjectTags from '../hooks/use-project-tags'
import useSiteMetadata from '../hooks/use-site-metadata'

import Container from '../components/Container'
import withRootTheme from '../components/withRootTheme'
import Navbar from '../components/FixedNavbar'
import Pager from '../components/Pager'
import Filters from '../components/Filters'
import Header from '../components/Header'

const useStyles = createUseStyles( ( { color } ) => ( {
  container: {
    maxWidth: '50vw',
    margin: '80px auto',
  },
  projects: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  project: {
    padding: '2em',
    boxSizing: 'border-box',
    width: '50%',
    fontSize: '18px',
    lineHeight: '1.5em',
    textDecoration: 'none',
  },
  title: {
    fontSize: '1.45em',
    fontWeight: 'normal',
    margin: '0.2em 0',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  description: {
    margin: 0,
    color: color.secondary,
  },
  image: {
    width: '20.5vw',
    height: '20.5vw',
    borderRadius: '15px',
    marginBottom: '1em',
  },
} ) )

const Projects = ( { data, pageContext } ) => {
  const { items } = getRemarkProps( data )

  const { title } = useSiteMetadata()
  const tags = useProjectTags()

  const classes = useStyles()

  return (
    <main>
      <Header title={`${title} | Projects`} />

      <Navbar active="projects" />

      <Container className={classes.container}>

        <Filters prefix="/projects" tags={tags} />

        <div className={classes.projects}>
          {items.map( ( { slug, name, description, image } ) => (
            <Link className={classes.project} to={slug}>
              <Img className={classes.image} {...image.childImageSharp} fadeIn />
              <h2 className={classes.title}>{name}</h2>
              <p className={classes.description}>{description}</p>
            </Link>
          ) )}
        </div>

        <Pager {...pageContext} />

      </Container>
    </main>
  )
}

Projects.propTypes = {
  data: shape( {} ).isRequired,
  pageContext: shape( {} ).isRequired,
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!, $tags: [String]!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "project-post" }, tags: { in: $tags } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            name
            description
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

export default withRootTheme( lightTheme )( Projects )
