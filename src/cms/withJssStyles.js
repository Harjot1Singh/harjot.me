import React, { useState } from 'react'
import injectSheet, { JssProvider, jss, ThemeProvider } from 'react-jss'

import { theme, globalStyles } from '../lib/theme'

const withJssStyles = ( Component ) => ( props ) => {
  const [ ready, setReady ] = useState( false )

  const setupJss = ( ref ) => {
    if ( !ref ) return

    jss.setup( { insertionPoint: ref.ownerDocument.querySelector( '#jss-preview-root' ) } )
    setReady( true )
  }

  const StyledComponent = injectSheet( globalStyles )( Component )

  return (
    <div ref={setupJss} id="jss-preview-root">
      {ready && (
        <JssProvider>
          <ThemeProvider theme={theme}>
            <StyledComponent {...props} />
          </ThemeProvider>
        </JssProvider>
      )}
    </div>
  )
}

export default withJssStyles
