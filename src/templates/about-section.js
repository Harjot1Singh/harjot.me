import React from 'react'
import { string, arrayOf, node } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { createUseStyles } from 'react-jss'

import { color, widthMoreThan, breakpoints, font } from '../lib/theme'
import withRemarkProps from '../components/withRemarkProps'
import HTMLContent from '../components/HTMLContent'
import Container from '../components/Container'
import useRotatingItem from '../hooks/use-rotating-item'
import SectionBackground from '../components/SectionBackground'
import SectionHeader from '../components/SectionHeader'
import Chip from '../components/Chip'

const useStyles = createUseStyles( {
  root: {
    background: color.lightGrey,
    color: color.white,
    paddingBottom: '50px',
    position: 'relative',
    fontSize: '2.75vmin',
    [ widthMoreThan( breakpoints.tablet ) ]: {
      fontSize: '1.5vmin',
    },
    [ widthMoreThan( breakpoints.mobile ) ]: {
      fontSize: '1.75vmin',
    },
  },
  content: {
    fontSize: '2em',
    textAlign: 'center',
    '& *': {
      color: color.white,
    },
  },
  skillsHeader: {
    width: '100%',
    fontWeight: 'normal',
    fontSize: '2em',
    textTransform: 'uppercase',
    fontFamily: font.body,
    color: color.white,
    marginTop: '1em',
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
} )

export const AboutSectionTemplate = ( { id, html, skills } ) => {
  const classes = useStyles()
  const highlightedSkill = useRotatingItem( skills )

  return (
    <section className={classes.root} id={id}>
      <SectionBackground />

      <Container>
        <SectionHeader className={classes.header}>About</SectionHeader>

        <HTMLContent className={classes.content}>{html}</HTMLContent>

        <h2 className={classes.skillsHeader}>I know</h2>

        <div className={classes.chips}>
          {skills.map( ( skill ) => (
            <Chip key={skill} active={highlightedSkill === skill}>{skill}</Chip>
          ) )}
        </div>

      </Container>
    </section>
  )
}

AboutSectionTemplate.propTypes = {
  id: string.isRequired,
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
