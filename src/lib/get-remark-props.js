const getRemarkProps = ( {
  markdownRemark: { html, frontmatter, fields, ...restMarkdown } = {},
  allMarkdownRemark: { edges = [], ...restAllMarkdown } = {},
  ...rest
} ) => ( {
  ...rest,
  ...restMarkdown,
  ...restAllMarkdown,
  ...frontmatter,
  ...fields,
  ...( html && { html } ),
  ...( edges.length && {
    items: edges.map( ( { node: markdownRemark } ) => getRemarkProps( { markdownRemark } ) ),
  } ),
} )

export default getRemarkProps
