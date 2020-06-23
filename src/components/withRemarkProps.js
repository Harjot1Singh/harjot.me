import React from 'react'

import getRemarkProps from '../lib/get-remark-props'

// Remaps props from remarkMarkdown and feeds any markdown through html prop
const withRemarkProps = ( Component, props ) => ( markdownProps ) => (
  <Component
    {...props}
    {...getRemarkProps( markdownProps )}
  />
)

export default withRemarkProps
