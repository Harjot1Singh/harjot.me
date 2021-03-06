import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { createUseStyles } from 'react-jss'
import { useTransition, animated, config } from 'react-spring'

import { color, widthLessThan, breakpoints, widthMoreThan } from '../lib/theme'
import useRotatingItem from '../hooks/use-rotating-item'
import useCommonData from '../hooks/use-common-data'
import withRemarkProps from '../components/withRemarkProps'
import Container from '../components/Container'
import SectionBackground from '../components/SectionBackground'
import IconLink from '../components/IconLink'
import Img from '../components/Img'

import GithubIcon from '../../static/img/icons/github.inline.svg'
import LinkedinIcon from '../../static/img/icons/linkedin.inline.svg'
import CvIcon from '../../static/img/icons/cv.inline.svg'
import TriangleDown from '../../static/img/icons/triangle-down.inline.svg'

const useStyles = createUseStyles( {
  root: {
    height: '90vh',
    maxHeight: '1080px',
    position: 'relative',
    fontSize: '1.5vmin',
    [ widthMoreThan( breakpoints.mobile ) ]: {
      height: '100vh',
      fontSize: '1vmin',
    },
  },
  main: {
    marginTop: '30px',
  },
  profilePicture: {
    width: '40em',
    height: '40em',
    margin: '10em',
    [ widthLessThan( breakpoints.mobile ) ]: {
      width: '30em',
      height: '30em',
    },
    overflow: 'visible !important',
    '& img': {
      borderRadius: '100vw',
      padding: '1em',
      background: color.darkGrey,
    },
    '&:before': {
      borderRadius: '100vw',
      position: 'absolute',
      padding: '10px',
      top: '-0.5em',
      left: '-0.5em',
      right: '-0.5em',
      bottom: '-2em',
      content: '""',
      background: `linear-gradient(${color.green}, transparent)`,
      transition: '500ms all ease-in',
    },
    '&:hover:before': {
      background: `linear-gradient(${color.green}, ${color.green})`,
      top: '10px',
    },
  },
  name: {
    fontSize: '7.75em',
    textTransform: 'uppercase',
    color: color.green,
    fontWeight: 'normal',
    margin: 0,
    '& > strong:after': { content: "' '" },
  },
  roleContainer: {
    position: 'relative',
    height: '60px',
    width: '100%',
    marginTop: '1em',
  },
  role: {
    margin: 0,
    width: '100%',
    textAlign: 'center',
    color: color.white,
    fontSize: '5.5em',
    textTransform: 'uppercase',
    fontWeight: 'normal',
    letterSpacing: '0.215em',
    '& > strong:after': { content: "' '" },
  },
  iconLinks: {
    position: 'absolute',
    bottom: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& svg': {
      width: '8em',
    },
  },
  icon: {
    margin: '0 15px',
  },
  triangleDown: {
    display: 'block',
    margin: '2em auto',
    width: '100% !important',
  },
} )

const roleTransitionsConfig = {
  config: config.stiff,
  from: { opacity: 0, position: 'absolute' },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
}

export const HomeSectionTemplate = ( {
  name,
  profilePicture,
  github,
  linkedin,
  id,
  roles,
  cv,
} ) => {
  const [ firstName, lastName ] = name.split( ' ' )
  const [ rolePrefix, rolePostfix ] = useRotatingItem( roles ).split( ' ' )

  const classes = useStyles()
  const roleTransitions = useTransition( { prefix: rolePrefix, postfix: rolePostfix }, ( { prefix, postfix } ) => `${prefix} ${postfix}`, roleTransitionsConfig )

  const icons = [
    [ cv.publicURL, CvIcon ],
    [ github, GithubIcon ],
    [ linkedin, LinkedinIcon ],
  ]

  return (
    <section className={classes.root} id={id}>
      <div className={classes.outerBackground}>
        <div className={classes.innerBackground} />
      </div>

      <SectionBackground insideDark borderRadius="35vw 0px 40vw 0" />

      <Container>

        <Container className={classes.main}>
          <Img
            className={classes.profilePicture}
            src={profilePicture}
            backgroundColor="transparent"
          />

          <h1 className={classes.name}>
            <strong>{firstName}</strong>
            {lastName}
          </h1>

          <div className={classes.roleContainer}>
            {roleTransitions.map( ( { item: { prefix, postfix }, props, key } ) => (
              <animated.h2 key={key} className={classes.role} style={props}>
                <strong>{prefix}</strong>
                {postfix}
              </animated.h2>
            ) )}
          </div>

        </Container>

      </Container>

      <div className={classes.iconLinks}>
        {icons.map( ( [ href, Icon ] ) => (
          <IconLink key={href} className={classes.icon} href={href}>
            <Icon />
          </IconLink>
        ) )}

        <TriangleDown className={classes.triangleDown} />
      </div>

    </section>
  )
}

HomeSectionTemplate.propTypes = {
  id: string.isRequired,
  roles: arrayOf( string ),
  cv: shape( { publicURL: string } ),
  name: string,
  profilePicture: shape( { childImageSharp: shape( {} ) } ),
  github: string,
  linkedin: string,
}

HomeSectionTemplate.defaultProps = {
  roles: [ '' ],
  cv: {},
  name: null,
  profilePicture: null,
  github: null,
  linkedin: null,
}

const query = graphql`
  {
    markdownRemark( frontmatter: { templateKey: { eq: "home-section" } } ) {
      frontmatter {
        name
        roles
        cv {
          publicURL
        }
      }
    }
  }
`

export default ( props ) => {
  const commonData = useCommonData()

  return (
    <StaticQuery
      query={query}
      render={withRemarkProps( HomeSectionTemplate, { ...commonData, ...props } )}
    />
  )
}
