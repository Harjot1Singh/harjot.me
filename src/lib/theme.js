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
  color: { primary: color.darkGrey, secondary: color.green },
  background: { dark: color.white, light: color.white },
  font,
}

export const getGlobalStyles = ( theme ) => ( {
  '@global': {
    body: {
      fontFamily: theme.font.body,
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
      width: '10px',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: theme.background.light,
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '100px',
    },
  },
} )
