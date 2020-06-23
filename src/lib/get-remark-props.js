const getRemarkProps = ( {
  markdownRemark: { html, frontmatter, fields, ...restMarkdown } = {},
  allMarkdownRemark: { edges = [] } = {},
  ...rest
} ) => ( {
  ...rest,
  ...restMarkdown,
  ...frontmatter,
  ...fields,
  ...( html && { html } ),
  ...( edges.length && {
    items: edges.map( ( { node: markdownRemark } ) => getRemarkProps( { markdownRemark } ) ),
  } ),
} )

export default getRemarkProps
