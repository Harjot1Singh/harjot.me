import React from 'react'

const withDefaultPreview = ( Template ) => ( { entry, widgetFor, getAsset } ) => {
  const { body, image, images, ...data } = entry.getIn( [ 'data' ] ).toJSON()

  return (
    <Template
      {...data}
      {...( image && { image: getAsset( image ) } )}
      {...( images && { images: images.map( ( image ) => getAsset( image ) ) } )}
      {...( body && { html: widgetFor( 'body' ) } )}
    />
  )
}

export default withDefaultPreview
