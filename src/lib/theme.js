import 'normalize.css'
import '../fonts/index.css'

export const theme = {
  color: {
    primary: '#ffffff',
    secondary: '#52bb78',
  },
  background: {
    dark: '#313036',
    light: '#404044',
  },
  font: {
    body: 'Montserrat',
    header: 'Glacial Indifference',
  },
}

export const globalStyles = {
  '@global': {
    body: {
      fontFamily: theme.font.body,
    },
    p: {
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
    'h1, h2, h3': {
      fontFamily: theme.font.header,
      color: theme.color.primary,
    },
  },
}

export default theme
