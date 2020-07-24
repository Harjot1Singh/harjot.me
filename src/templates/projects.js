import React from 'react'
import { shape } from 'prop-types'
import { createUseStyles } from 'react-jss'
import { graphql, Link } from 'gatsby'

import { lightTheme, color, widthMoreThan, breakpoints, widthLessThan } from '../lib/theme'
import getRemarkProps from '../lib/get-remark-props'

import useProjectTags from '../hooks/use-project-tags'
import useSiteMetadata from '../hooks/use-site-metadata'

import Container from '../components/Container'
import withRootTheme from '../components/withRootTheme'
import Navbar from '../components/FixedNavbar'
import Pager from '../components/Pager'
import Filters from '../components/Filters'
import Header from '../components/Header'
import Img from '../components/Img'
import withTransition from '../components/withTransition'

const useStyles = createUseStyles( {
  container: {
    margin: '80px auto',
    maxWidth: '50vw',
    [ widthLessThan( breakpoints.laptop ) ]: {
      maxWidth: '90vw',
      margin: '50px auto',
    },
    [ widthLessThan( breakpoints.tablet ) ]: {
      maxWidth: '100vw',
    },
  },
  projects: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  project: {
    [ widthLessThan( breakpoints.tablet ) ]: {
      width: '100%',
    },
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
    color: color.lightGrey,
  },
  image: {
    width: '20.5vw',
    height: '20.5vw',
    [ widthLessThan( breakpoints.laptop ) ]: {
      width: '35.35vw',
      height: '35.35vw',
    },
    [ widthLessThan( breakpoints.tablet ) ]: {
      width: '77.5vw',
      height: '77.5vw',
    },
    borderRadius: '15px',
    marginBottom: '1em',
  },
} )

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
          {items.map( ( { slug, name, description, images: [ image ] } ) => (
            <Link key={slug} className={classes.project} to={slug}>
              <Img className={classes.image} src={image} fadeIn />
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
            images {
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

export default withRootTheme( lightTheme )( withTransition( Projects ) )
