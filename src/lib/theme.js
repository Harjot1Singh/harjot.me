import 'normalize.css'

import '../fonts/index.css'

export const font = {
  body: 'Montserrat',
  header: 'Glacial Indifference',
}

export const color = {
  white: '#ffffff',
  green: '#52bb78',
  darkGrey: '#313036',
  lightGrey: '#404044',
}

export const darkTheme = {
  color: { primary: color.white, secondary: color.green },
  background: { dark: color.darkGrey, light: color.lightGrey },
  font,
}

export const lightTheme = {
  color: { primary: color.darkGrey, secondary: color.lightGrey },
  background: { dark: color.white, light: color.white },
  font,
}

export const getGlobalStyles = ( theme ) => ( {
  '@global': {
    body: {
      fontFamily: theme.font.body,
      overflowX: 'hidden',
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    'p, li': {
      color: theme.color.primary,
    },
    a: {
      color: theme.color.primary,
      transition: '0.15s all ease-in-out',
      '&:hover': {
        color: color.green,
      },
    },
    'h1, h2, h3': {
      fontFamily: theme.font.header,
      color: theme.color.primary,
    },
    '::-webkit-scrollbar': {
      width: '12px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.48)',
      borderRadius: '8px',
    },
  },
} )

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
}

export const widthMoreThan = ( width ) => `@media screen and (min-device-width: ${width}px)`
export const widthLessThan = ( width ) => `@media screen and (max-device-width: ${width - 1}px)`
