import React from 'react'

// Remaps props from remarkMarkdown and feeds any markdown through html prop
const withRemarkProps = ( Component, props ) => ( { markdownRemark: { html, frontmatter } } ) => (
  <Component
    {...props}
    {...frontmatter}
    html={html}
  />
)

export default withRemarkProps
