import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql, StaticQuery, Link } from 'gatsby'
import { createUseStyles } from 'react-jss'
import Img from 'gatsby-image'

import withRemarkProps from '../components/withRemarkProps'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import SectionBackground from '../components/SectionBackground'

const useStyles = createUseStyles( ( { color } ) => ( {
  root: {
    overflow: 'hidden',
    position: 'relative',
  },
  innerBackground: {
    height: '110px',
    top: '-10px',
  },
  cards: {
    margin: '50px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
  },
  card: {
    position: 'relative',
    margin: '10px',
    borderRadius: '15px',
    transition: '0.15s all ease-in-out',
    '&:before': {
      borderRadius: 'inherit',
      content: '""',
      position: 'absolute',
      top: '-3px',
      left: '-3px',
      right: '-3px',
      bottom: 0,
      background: `linear-gradient(${color.primary}, transparent)`,
      transition: '0.3s all ease-in',
    },
    '& img': {
      borderRadius: '15px',
      transition: '0.4s all ease-out !important',
    },
    '&:hover': {
      '&:before': {
        background: `linear-gradient(${color.primary}, transparent)`,
      },
      '& > *': {
        borderRadius: '15px',
        display: 'flex',
      },
      '& img': {
        filter: 'blur(10px) brightness(40%) saturate(50%)',
        transform: 'scale(1.1)',
      },
    },
  },
  cardContent: {
    display: 'none',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    '& h3': {
      textTransform: 'uppercase',
      fontWeight: 'normal',
    },
  },
  viewAll: {
    fontSize: '28px',
    textDecoration: 'none',
    marginBottom: '35px',
    transition: '0.15s all ease-in-out',
  },
} ) )

export const ProjectSectionTemplate = ( { id, items } ) => {
  const classes = useStyles()

  return (
    <section className={classes.root} id={id}>
      <SectionBackground className={classes.innerBackground} outsideDark borderRadius="0 0 0 10vw" />

      <Container>
        <SectionHeader>Projects</SectionHeader>

        <div className={classes.cards}>
          {items.map( ( { name, image, slug } ) => (
            <Link key={slug} className={classes.card} to={slug}>
              <Img {...image.childImageSharp} />

              <div className={classes.cardContent}>
                <h3>{name}</h3>
              </div>
            </Link>
          ) )}
        </div>

        <Link className={classes.viewAll} to="/projects">View All ▸</Link>

      </Container>
    </section>
  )
}

ProjectSectionTemplate.propTypes = {
  id: string.isRequired,
  items: arrayOf( shape( { name: string } ) ),
}

ProjectSectionTemplate.defaultProps = {
  items: [],
}

const query = graphql`
{
  allMarkdownRemark(limit: 6, sort: {order: DESC, fields: frontmatter___date}, filter: {frontmatter: {templateKey: {eq: "project-post"}, featured: {eq: true}}}) {
    edges {
      node {
        id
        html
        fields {
          slug
        }
        frontmatter {
          name
          date
          tags
          image {
          childImageSharp {
            fixed(quality: 100, width: 400, height: 200) {
                ...GatsbyImageSharpFixed
             }
           }
          }
        }
      }
    }
  }
}

`

export default ( props ) => (
  <StaticQuery
    query={query}
    render={withRemarkProps( ProjectSectionTemplate, props )}
  />
)
