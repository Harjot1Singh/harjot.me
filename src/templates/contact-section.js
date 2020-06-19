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

const useStyles = createUseStyles( ( { color, background } ) => ( {
  root: {
    position: 'relative',
    paddingBottom: '75px',
  },
  outerBackground: {
    zIndex: '-1',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: background.dark,
    overflow: 'hidden',
  },
  innerBackground: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '105%',
    height: '100%',
    left: '-1%',
    borderRadius: '0 25vw 0 0',
    backgroundColor: background.light,
    border: `6px solid ${color.secondary}`, // Todo: replace with gradient https://css-tricks.com/examples/GradientBorder/
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
      color: color.primary,
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
} ) )

export const ContactSectionTemplate = ( { email, linkedin, github, html } ) => {
  const classes = useStyles()

  const icons = [
    [ `mailto:${email}`, EmailIcon, email ],
    [ linkedin, LinkedinIcon, linkedin.split( 'https://' )[ 1 ] ],
    [ github, GithubIcon, github.split( 'https://' )[ 1 ] ],
  ]

  return (
    <section className={classes.root}>
      <SectionBackground outsideDark borderRadius="0 15vw 0 0" />

      <Container>
        <SectionHeader>Contact</SectionHeader>

        <Container className={classes.container}>

          <HTMLContent className={classes.content}>{html}</HTMLContent>

          <div className={classes.iconLinks}>
            {icons.map( ( [ href, Icon, text ] ) => (
              <IconLink className={classes.icon} href={href}>
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
