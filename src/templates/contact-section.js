import React from 'react'
import { string, node } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { createUseStyles } from 'react-jss'

import withRemarkProps from '../components/withRemarkProps'
import withCommonData from '../components/withCommonData'

import GithubIcon from '../../static/img/icons/github.inline.svg'
import LinkedinIcon from '../../static/img/icons/linkedin.inline.svg'
import EmailIcon from '../../static/img/icons/email.inline.svg'
import Container from '../components/Container'
import HTMLContent from '../components/HTMLContent'
import SectionHeader from '../components/SectionHeader'
import SectionBackground from '../components/SectionBackground'
import IconLink from '../components/IconLink'

const useStyles = createUseStyles( {
  root: {
    position: 'relative',
    paddingBottom: '75px',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    fontSize: '28px',
    lineHeight: '40px',
  },
  iconLinks: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      textDecoration: 'none',
      fontSize: '24px',
      fontWeight: 'bold',
    },
  },
  icon: {
    margin: '20px',
    '& svg': {
      width: '65px',
      height: '65px',
      marginRight: '40px',
    },
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
} )

export const ContactSectionTemplate = ( { id, email, linkedin, github, html } ) => {
  const classes = useStyles()

  const icons = [
    [ `mailto:${email}`, EmailIcon, email ],
    [ linkedin, LinkedinIcon, linkedin.split( 'https://' )[ 1 ] ],
    [ github, GithubIcon, github.split( 'https://' )[ 1 ] ],
  ]

  return (
    <section className={classes.root} id={id}>
      <SectionBackground outsideDark borderRadius="0 15vw 0 0" />

      <Container>
        <SectionHeader>Contact</SectionHeader>

        <Container className={classes.container}>

          <HTMLContent className={classes.content}>{html}</HTMLContent>

          <div className={classes.iconLinks}>
            {icons.map( ( [ href, Icon, text ] ) => (
              <IconLink key={href} className={classes.icon} href={href}>
                <Icon />
                <span>{text}</span>
              </IconLink>
            ) )}

          </div>

        </Container>

      </Container>
    </section>
  )
}

ContactSectionTemplate.propTypes = {
  id: string.isRequired,
  email: string,
  linkedin: string,
  github: string,
  html: node,
}
ContactSectionTemplate.defaultProps = {
  email: null,
  linkedin: null,
  github: null,
  html: null,
}

const query = graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "contact-section"}}) {
      html
    }
  }
`

export default ( props ) => (
  <StaticQuery
    query={query}
    render={withRemarkProps( withCommonData( ContactSectionTemplate ), props )}
  />
)
