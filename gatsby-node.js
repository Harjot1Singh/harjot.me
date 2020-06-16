const { kebabCase } = require( 'lodash' )
const path = require( 'path' )
const { createFilePath } = require( 'gatsby-source-filesystem' )
const { fmImagesToRelative } = require( 'gatsby-remark-relative-images' )

exports.createPages = ( { actions, graphql } ) => {
  const { createPage } = actions

  return graphql( `
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  ` ).then( ( { errors, data: { allMarkdownRemark: { edges: posts } } } ) => {
    if ( errors ) {
      errors.forEach( ( e ) => console.error( e.toString() ) )
      return Promise.reject( errors )
    }

    // Create post pages
    posts.forEach( ( {
      node: {
        fields: { slug },
        frontmatter: { tags, templateKey },
        id,
      },
    } ) => createPage( {
      path: slug,
      tags,
      component: path.resolve( `src/templates/${templateKey}.js` ),
      context: { id },
    } ) )

    // Grab all tags
    const tags = Array.from( new Set(
      posts.reduce( ( acc, { node: { frontmatter: { tags = [] } = {} } = {} } ) => [
        ...acc,
        ...tags,
      ], [] ),
    ) )

    // Create tag pages
    tags.forEach( ( tag ) => createPage( {
      path: `/tags/${kebabCase( tag )}/`,
      component: path.resolve( 'src/templates/tags.js' ),
      context: { tag },
    } ) )

    return Promise.resolve()
  } )
}

exports.onCreateNode = ( { node, actions, getNode } ) => {
  const { createNodeField } = actions
  fmImagesToRelative( node ) // convert image paths for gatsby images

  if ( node.internal.type === 'MarkdownRemark' ) {
    const value = createFilePath( { node, getNode } )
    createNodeField( { name: 'slug', node, value } )
  }
}
