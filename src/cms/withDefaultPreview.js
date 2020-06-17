import React from 'react'

const withDefaultPreview = ( Template, { markdownField } ) => ( { entry, widgetFor } ) => (
  <Template
    {...entry.getIn( [ 'data' ] ).toJSON()}
    {...( markdownField && { [ markdownField ]: widgetFor( markdownField ) } )}
  />
)

export default withDefaultPreview
