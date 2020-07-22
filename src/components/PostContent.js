import React from 'react'
import { createUseStyles } from 'react-jss'

import HTMLContent from './HTMLContent'
import { color, breakpoints, widthLessThan } from '../lib/theme'

const useStyles = createUseStyles( () => ( {
  content: {
    width: '100%',
    lineHeight: '1.5',

    // Code block highlighting
    '--grvsc-line-highlighted-background-color': 'rgba(255, 255, 255, 0.2)',
    '--grvsc-line-highlighted-border-color': color.green,
    '--grvsc-line-highlighted-border-width': '5px',
    '& .grvsc-container': {
      fontSize: '14px',
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    },

    '& img': {
      width: '100%',
    },
    // Headers
    '& h1': {
      color: 'red',
      textDecoration: 'line-through',
    },
    '& h2': {
      lineHeight: '1em',
      fontSize: '2em',
      marginTop: '1.5em',
      marginBottom: '0.75em',
    },
    '& h3': {
      fontSize: '1.5em',
      lineHeight: '1em',
      marginTop: '1.5em',
      marginBottom: '0.75em',
    },
    '& h4': {
      fontSize: '1em',
      marginTop: '1.5em',
      marginBottom: '0.75em',
    },
    '& h6': {
      margin: 0,
      textAlign: 'center',
      opacity: 0.7,
    },
    '& blockquote': {
      fontSize: '1.5em',
      [ widthLessThan( breakpoints.tablet ) ]: {
        fontSize: '1.25em',
        margin: 0,
      },
      paddingLeft: '0.5em',
      borderLeft: `4px solid ${color.green}`,
    },
    // List checkboxes
    '& li input[type="checkbox"]': {
      width: '1em',
      height: '1em',
      margin: '0 0.5em',
    },
    // Sublists
    '& li p': {
      margin: 0,
    },
  },
} ) )

const PostContent = ( props ) => {
  const classes = useStyles()

  return <HTMLContent {...props} className={classes.content} />
}

export default PostContent
