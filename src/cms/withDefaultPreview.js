import React from 'react'

const withDefaultPreview = ( Template ) => ( { entry, widgetFor, getAsset } ) => {
  const { body, image, ...data } = entry.getIn( [ 'data' ] ).toJSON()

  return (
    <Template
      {...data}
      {...( image && { image: getAsset( image ) } )}
      {...( body && { html: widgetFor( 'body' ) } )}
    />
  )
}

export default withDefaultPreview
