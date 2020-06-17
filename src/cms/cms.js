import CMS from 'netlify-cms-app'

import withDefaultPreview from './withDefaultPreview'
import templates from './templates'

templates.forEach( ( { name, Template, ...options } ) => CMS.registerPreviewTemplate(
  name,
  withDefaultPreview( Template, options ),
) )
