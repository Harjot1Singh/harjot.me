import React from 'react'
import { node } from 'prop-types'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import { ThemeProvider, createUseStyles } from 'react-jss'

import theme from '../lib/theme'
import useSiteMetadata from '../hooks/use-site-metadata'

import Navbar from './Navbar'

const useStyles = createUseStyles( {
  '@global': {
    body: {
      fontFamily: theme.font.body,
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
} )

const TemplateWrapper = ( { children } ) => {
  const { title, description } = useSiteMetadata()

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>

      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix( '/' )}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix( '/' )}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix( '/' )}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix( '/' )}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix( '/' )}img/og-image.jpg`}
        />
      </Helmet>

      <div className={classes.root}>
        <Navbar />
        <main>{children}</main>
      </div>

    </ThemeProvider>
  )
}

TemplateWrapper.propTypes = {
  children: node.isRequired,
}

export default TemplateWrapper
