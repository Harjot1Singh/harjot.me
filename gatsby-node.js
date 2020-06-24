const path = require( 'path' )
const { kebabCase } = require( 'lodash' )
const { createFilePath } = require( 'gatsby-source-filesystem' )
const { fmImagesToRelative } = require( 'gatsby-remark-relative-images' )
const { paginate } = require( 'gatsby-awesome-pagination' )

const getTagPages = ( graphql ) => async ( tag, templateKey ) => {
  const { errors, data } = await graphql( `
  {
    allMarkdownRemark(
        ${templateKey ? ` filter: { frontmatter: { tags: { in: "${tag}" } templateKey: { eq: "${templateKey}" } } } ` : ''}
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
      edges {
        node {
          id
          fields { slug }
        }
      }
    }
  }
` )

  if ( errors ) throw errors

  const { allMarkdownRemark: { edges } } = data
  return edges
}

const getTags = ( graphql ) => async ( templateKey ) => {
  const { errors, data } = await graphql( `
  {
    allMarkdownRemark${templateKey ? `(filter: { frontmatter: { templateKey: { eq: "${templateKey}" } } } )` : ''} {
      distinct(field: frontmatter___tags)
    }
  }
` )

  if ( errors ) throw errors

  const { allMarkdownRemark: { distinct } } = data
  return distinct
}

const getPages = ( graphql ) => async ( templateKey ) => {
  const { errors, data } = await graphql( `
  {
    allMarkdownRemark(
      ${templateKey ? ` filter: { frontmatter: { templateKey: { eq: "${templateKey}" } } } ` : ''}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {      edges {
        node {
          id
          fields { slug }
          frontmatter { templateKey }
        }
      }
    }
  }
` )

  if ( errors ) throw errors

  const { allMarkdownRemark: { edges } } = data
  return edges
}

// Create all pages for any data with templates
const createTemplatePages = ( { actions, graphql } ) => async () => {
  const { createPage } = actions

  const pages = await getPages( graphql )()
  // Create pages
  pages
    .filter( ( { node: { frontmatter: { templateKey } } } ) => templateKey )
    .forEach( ( { node: { fields: { slug }, frontmatter: { templateKey }, id } } ) => createPage( {
      path: slug,
      component: path.resolve( `src/templates/${templateKey}.js` ),
      context: { id },
    } ) )
}

// Create paginated blog pages with tag filters
const createBlogPages = ( {
  prefix,
  itemsPerPage,
  templateKey,
  component,
} ) => ( { graphql, actions } ) => async () => {
  const { createPage } = actions

  const createPages = ( items, pathPrefix, tags ) => paginate( {
    createPage,
    items,
    itemsPerPage,
    pathPrefix,
    component,
    context: { tags },
  } )

  const pages = await getPages( graphql )( templateKey )
  const tags = await getTags( graphql )( templateKey )

  const items = [
    [ pages, prefix, tags ],
    ...( await Promise.all( tags.map( async ( tag ) => [
      await getTagPages( graphql )( tag, templateKey ),
      `${prefix}/${kebabCase( tag )}`,
      [ tag ],
    ] ) ) ),
  ]

  await Promise.all( items.map( ( params ) => createPages( ...params ) ) )
}

exports.createPages = async ( params ) => {
  const actions = [
    createTemplatePages,
    createBlogPages( { prefix: '/blog', itemsPerPage: 5, templateKey: 'blog-post', component: path.resolve( 'src/templates/blog.js' ) } ),
    createBlogPages( { prefix: '/projects', itemsPerPage: 6, templateKey: 'project-post', component: path.resolve( 'src/templates/projects.js' ) } ),
  ].map( ( fn ) => fn( params )() )

  try {
    await Promise.all( actions )
  } catch ( error ) {
    console.error( error )
  }
}

exports.onCreateNode = ( { node, actions, getNode } ) => {
  const { createNodeField } = actions
  fmImagesToRelative( node ) // convert image paths for gatsby images

  if ( node.internal.type === 'MarkdownRemark' ) {
    const value = createFilePath( { node, getNode } )
    createNodeField( { name: 'slug', node, value } )
  }
}
