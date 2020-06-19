import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { createUseStyles } from 'react-jss'

import withRemarkProps from '../components/withRemarkProps'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import SectionBackground from '../components/SectionBackground'

const useStyles = createUseStyles( ( { background, color } ) => ( {
  root: {
    overflow: 'hidden',
    position: 'relative',
  },
  innerBackground: {
    height: '110px',
    top: '-10px',
  },
} ) )

export const ProjectSectionTemplate = ( { projects } ) => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <SectionBackground className={classes.innerBackground} outsideDark borderRadius="0 0 0 10vw" />

      <Container>
        <SectionHeader>Projects</SectionHeader>

        fs
      </Container>
    </section>
  )
}

ProjectSectionTemplate.propTypes = {
  projects: arrayOf( shape( { name: string } ) ),
}
ProjectSectionTemplate.defaultProps = {
  projects: [],
}

const query = graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "projects-section"}}) {
      html
      frontmatter {
        projects
      }
    }
  }
`

export default ( props ) => (
  <StaticQuery
    query={query}
    render={withRemarkProps( ProjectSectionTemplate, props )}
  />
)
