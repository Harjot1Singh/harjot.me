import React from 'react'

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

// Remaps props from remarkMarkdown and feeds any markdown through html prop
const withRemarkProps = ( Component, props ) => ( markdownProps ) => (
  <Component
    {...props}
    {...getRemarkProps( markdownProps )}
  />
)

export default withRemarkProps
