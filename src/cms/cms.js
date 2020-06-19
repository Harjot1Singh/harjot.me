import CMS from 'netlify-cms-app'

import withDefaultPreview from './withDefaultPreview'
import withJssStyles from './withJssStyles'
import templates from './templates'

templates.forEach( ( { name, Template, ...options } ) => CMS.registerPreviewTemplate(
  name,
  withDefaultPreview( withJssStyles( Template ), options ),
) )
