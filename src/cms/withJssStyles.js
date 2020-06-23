import React, { useState } from 'react'
import { JssProvider, jss } from 'react-jss'

const withJssStyles = ( Component ) => ( props ) => {
  const [ ready, setReady ] = useState( false )

  const setupJss = ( ref ) => {
    if ( !ref ) return

    jss.setup( { insertionPoint: ref.ownerDocument.querySelector( '#jss-preview-root' ) } )
    setReady( true )
  }

  return (
    <div ref={setupJss} id="jss-preview-root">
      {ready && ( <JssProvider><Component {...props} /></JssProvider> )}
    </div>
  )
}

export default withJssStyles
