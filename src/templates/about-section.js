import React from 'react'
import { string, arrayOf, node } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { createUseStyles } from 'react-jss'

import clsx from 'clsx'
import withRemarkProps from '../components/withRemarkProps'
import HTMLContent from '../components/HTMLContent'
import Container from '../components/Container'
import useRotatingItem from '../hooks/use-rotating-item'
import SectionBackground from '../components/SectionBackground'
import SectionHeader from '../components/SectionHeader'

const useStyles = createUseStyles( ( { color, background, font } ) => ( {
  root: {
    background: background.light,
    paddingBottom: '50px',
    position: 'relative',
  },
  content: {
    fontSize: '30px',
    textAlign: 'center',
  },
  skillsHeader: {
    width: '100%',
    fontWeight: 'normal',
    fontSize: '30px',
    textTransform: 'uppercase',
    fontFamily: font.body,
    color: color.secondary,
  },
  chips: {
    display: 'flex',
  },
  chip: {
    color: color.primary,
    transition: '0.3s all ease-in-out',
    padding: '7px 15px',
    margin: '5px',
    fontSize: '20px',
    borderRadius: '100px',
    background: background.dark,
  },
  activeChip: {
    background: color.secondary,
  },
} ) )

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
            <div
              key={skill}
              className={clsx(
                classes.chip,
                { [ classes.activeChip ]: highlightedSkill === skill },
              )}
            >
              {skill}
            </div>
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
