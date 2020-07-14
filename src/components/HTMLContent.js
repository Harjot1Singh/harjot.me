import React from 'react'
import PropTypes from 'prop-types'

const HTMLContent = ( { children, className } ) => ( typeof children === 'string'
  ? <div className={className} dangerouslySetInnerHTML={{ __html: children }} />
  : <div className={className}>{children}</div> )

HTMLContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.defaultProps = {
  children: null,
  className: null,
}

export default HTMLContent
