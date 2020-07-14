import React from 'react'
import { oneOfType, string, object } from 'prop-types'
import GatsbyImg from 'gatsby-image'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

const useStyles = createUseStyles( {
  previewContainer: {
    position: 'relative',
  },
  img: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
} )

const Img = ( { className, src, ...props } ) => {
  const classes = useStyles()

  if ( !src ) return null

  if ( src.childImageSharp ) {
    return <GatsbyImg className={className} {...props} {...src.childImageSharp} />
  }

  return (
    <div className={clsx( className, classes.previewContainer )} {...props}>
      <img className={classes.img} src={src.url || src} alt="" />
    </div>
  )
}

Img.propTypes = {
  className: string,
  src: oneOfType( [ string, object ] ).isRequired,
}

Img.defaultProps = {
  className: null,
}

export default Img
