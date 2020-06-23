import React from 'react'
import injectSheet, { ThemeProvider } from 'react-jss'

import { getGlobalStyles } from '../lib/theme'

const withRootTheme = ( theme ) => ( Component ) => injectSheet( getGlobalStyles( theme ) )(
  ( props ) => (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  ),
)

export default withRootTheme
