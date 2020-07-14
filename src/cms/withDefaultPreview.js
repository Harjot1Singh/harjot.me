import React from 'react'

const withDefaultPreview = ( Template ) => ( { entry, widgetFor } ) => {
  const { body, ...data } = entry.getIn( [ 'data' ] ).toJSON()

  return (
    <Template
      {...data}
      {...( body && { html: widgetFor( 'body' ) } )}
    />
  )
}

export default withDefaultPreview
