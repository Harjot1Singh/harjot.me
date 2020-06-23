const getRemarkProps = ( {
  markdownRemark: { html, frontmatter, fields } = {},
  allMarkdownRemark: { edges = [] } = {},
  ...rest
} ) => ( {
  ...rest,
  ...frontmatter,
  ...fields,
  ...( html && { html } ),
  ...( edges.length && {
    items: edges.map( ( { node: markdownRemark } ) => getRemarkProps( { markdownRemark } ) ),
  } ),
} )

export default getRemarkProps
