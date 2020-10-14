import React from 'react'
import { node, string, arrayOf, shape } from 'prop-types'
import { graphql } from 'gatsby'
import { createUseStyles } from 'react-jss'
import { Disqus } from 'gatsby-plugin-disqus'
import ImageGallery from 'react-image-gallery'

import getRemarkProps from '../lib/get-remark-props'
import { lightTheme, widthLessThan, breakpoints, color } from '../lib/theme'
import withRootTheme from '../components/withRootTheme'
import Header from '../components/Header'
import Container from '../components/Container'
import Navbar from '../components/FixedNavbar'
import Tags from '../components/Tags'
import PostContent from '../components/PostContent'
import withTransition from '../components/withTransition'
import Chip from '../components/Chip'

import Download from '../../static/img/icons/download.inline.svg'

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
  images: {
    width: '100%',
    margin: '2em 0',
  },
  title: {
    fontSize: '48px',
    margin: 0,
    color: color.lightGrey,
  },
  description: {
    fontWeight: 'normal',
    fontSize: '1em',
    margin: 0,
  },
  date: {
    color: color.lightGrey,
    fontSize: '1.15em',
    margin: 0,
    marginLeft: 'auto',
  },
  footer: {
    fontSize: '0.75em',
    margin: '50px 0 0 0',
    width: '100%',
    alignItems: 'center',
  },
  footerHeader: {
    marginBottom: '0.5em',
    textTransform: 'uppercase',
    color: color.lightGrey,
  },
  comments: {
    marginTop: '1em',
  },
  files: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& > :first-child > div': {
      marginLeft: 0,
    },
    '& svg': {
      height: '1em',
    },
  },
  download: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75em',
    '&': {
      textDecoration: 'none',
    },
    '& svg': {
      fill: color.white,
      marginLeft: '0.75em',
      width: '1em',
    },
  },
} )

const getImageProps = ( props ) => {
  if ( props.url ) return { original: props.url, thumbnail: props.url }

  if ( !props || !props.childImageSharp ) return null

  const { childImageSharp: { fluid: {
    sizes,
    srcSet,
    src,
  } } } = props

  return { sizes, srcSet, thumbnail: src, original: src }
}

export const ProjectPostTemplate = ( {
  name,
  year,
  html,
  description,
  files,
  images,
  tags,
  slug,
} ) => {
  const classes = useStyles()

  const disqusConfig = { identifier: slug, title: name }

  const items = images.map( getImageProps )

  return (
    <Container className={classes.container}>
      <h2 className={classes.date}>{year}</h2>
      <h1 className={classes.title}>{name}</h1>
      <h3 className={classes.description}>{description}</h3>
      <ImageGallery
        additionalClass={classes.images}
        items={items}
        showPlayButton={false}
      />

      <PostContent>{html}</PostContent>

      <footer className={classes.footer}>

        {files && files.length && (
          <>
            <h4 className={classes.footerHeader}>Files</h4>
            <div className={classes.files}>
              {files.map( ( { name, file: { publicURL } = {} } ) => (
                <a className={classes.download} href={publicURL} rel="noreferrer" target="_blank">
                  <Chip>
                    {name}
                    <Download />
                  </Chip>
                </a>
              ) )}
            </div>
          </>
        )}

        <h4 className={classes.footerHeader}>Tags</h4>
        <Tags tags={tags} prefix="/projects" />

        <div className={classes.comments}>
          <Disqus config={disqusConfig} />
        </div>
      </footer>

    </Container>
  )
}

ProjectPostTemplate.propTypes = {
  html: node,
  name: string,
  year: string,
  description: string,
  tags: arrayOf( string ),
  images: arrayOf( shape( { childImageSharp: {} } ) ),
  files: arrayOf( shape( {
    name: string,
    file: shape( { publicURL: string } ),
  } ) ),
  slug: string.isRequired,
}

ProjectPostTemplate.defaultProps = {
  html: null,
  name: null,
  year: null,
  description: null,
  tags: [],
  images: [ {} ],
  files: [],
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
        files {
          name
          file {
            publicURL
          }
        }
        images {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1920) {
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
  const remarkProps = getRemarkProps( data )

  return (
    <main>
      <Header title={remarkProps.name} description={remarkProps.excerpt} />
      <Navbar active="projects" />
      <Component {...remarkProps} />
    </main>
  )
}

ProjectPost.propTypes = {
  data: shape( {} ).isRequired,
}

export default withTransition( ProjectPost )

