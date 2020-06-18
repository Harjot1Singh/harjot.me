import React from 'react'
import { string, arrayOf, node } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import withRemarkProps from '../components/withRemarkProps'

export const AboutSectionTemplate = ( { html, skills } ) => (
  <section className="section section--gradient">
    {html}
  </section>
)

AboutSectionTemplate.propTypes = {
  html: node,
  skills: arrayOf( string ),
}
AboutSectionTemplate.defaultProps = {
  html: null,
  skills: [],
}

const query = graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "about-section"}}) {
      html
      frontmatter {
        skills
      }
    }
  }
`

export default ( props ) => (
  <StaticQuery
    query={query}
    render={withRemarkProps( AboutSectionTemplate, props )}
  />
)
