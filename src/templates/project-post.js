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
  description: {
    fontWeight: 'normal',
    fontSize: '1em',
    margin: 0,
  },
  date: {
    color: color.secondary,
    fontSize: '1.15em',
    margin: 0,
    marginLeft: 'auto',
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

export const ProjectPostTemplate = ( { name, year, html, description, image, tags, slug } ) => {
  const classes = useStyles()

  const disqusConfig = { identifier: slug, title: name }

  return (
    <main>
      <Header title={name} description={description} />
      <Navbar active="projects" />

      <Container className={classes.container}>
        <h2 className={classes.date}>{year}</h2>
        <h1 className={classes.title}>{name}</h1>
        <h3 className={classes.description}>{description}</h3>
        <Img className={classes.image} {...image.childImageSharp} />

        <PostContent>{html}</PostContent>

        <footer className={classes.footer}>
          <h4 className={classes.tagsHeader}>Tags</h4>
          <Tags tags={tags} prefix="/projects" />

          <div className={classes.comments}>
            <Disqus config={disqusConfig} />
          </div>
        </footer>

      </Container>

    </main>
  )
}

ProjectPostTemplate.propTypes = {
  html: node,
  name: string,
  year: string,
  description: string,
  tags: arrayOf( string ),
  image: shape( { childImageSharp: {} } ),
  slug: string.isRequired,
}

ProjectPostTemplate.defaultProps = {
  html: null,
  name: null,
  year: null,
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
        name
        year
        description
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

const ProjectPost = ( { data } ) => {
  const Component = withRootTheme( lightTheme )( ProjectPostTemplate )

  return <Component {...getRemarkProps( data )} />
}

ProjectPost.propTypes = {
  data: shape( {} ).isRequired,
}

export default ProjectPost

