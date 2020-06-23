const { kebabCase } = require( 'lodash' )
const path = require( 'path' )
const { createFilePath } = require( 'gatsby-source-filesystem' )
const { fmImagesToRelative } = require( 'gatsby-remark-relative-images' )
const { paginate } = require( 'gatsby-awesome-pagination' )

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
  ` ).then( ( { errors, data } ) => {
    if ( errors ) {
      errors.forEach( ( e ) => console.error( e.toString() ) )
      return Promise.reject( errors )
    }

    const { allMarkdownRemark: { edges: pages } } = data

    // Create pages
    pages
      .filter( ( { node: { frontmatter: { templateKey } } } ) => templateKey )
      .forEach( ( {
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

    // Create paginated blog pages
    const blogPosts = pages.filter( ( { node: { frontmatter: { templateKey } } } ) => templateKey === 'blog-post' )
    paginate( {
      createPage,
      items: blogPosts,
      itemsPerPage: 10,
      pathPrefix: '/blog',
      component: path.resolve( 'src/templates/blog.js' ),
    } )

    // Create paginated project pages
    const projects = pages.filter( ( { node: { frontmatter: { templateKey } } } ) => templateKey === 'project-post' )
    paginate( {
      createPage,
      items: projects,
      itemsPerPage: 10,
      pathPrefix: '/projects',
      component: path.resolve( 'src/templates/projects.js' ),
    } )

    // Grab all tags
    const tags = Array.from( new Set(
      pages.reduce( ( acc, { node: { frontmatter: { tags } = {} } = {} } ) => [
        ...acc,
        ...( tags || [] ),
      ], [] ),
    ) )

    // Create tag pages
    tags.forEach( ( tag ) => createPage( {
      path: `/tags/${kebabCase( tag )}/`,
      component: path.resolve( 'src/templates/tag.js' ),
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
