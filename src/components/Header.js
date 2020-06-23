import React from 'react'
import { string } from 'prop-types'
import { Helmet } from 'react-helmet'

import useSiteMetadata from '../hooks/use-site-metadata'

const Header = ( { title, description } ) => {
  const site = useSiteMetadata()

  return (
    <Helmet>
      <html lang="en" />
      <title>{title || site.title}</title>
      <meta name="description" content={description || site.description} />

      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="/" />
    </Helmet>
  )
}

Header.propTypes = {
  title: string,
  description: string,
}

Header.defaultProps = {
  title: null,
  description: null,
}

export default Header
