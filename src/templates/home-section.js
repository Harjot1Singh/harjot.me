import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { createUseStyles } from 'react-jss'
import { useTransition, animated } from 'react-spring'
import Img from 'gatsby-image'

import useRotatingItem from '../hooks/use-rotating-item'
import withRemarkProps from '../components/withRemarkProps'
import withCommonData from '../components/withCommonData'
import Container from '../components/Container'

import GithubIcon from '../../static/img/icons/github.inline.svg'
import LinkedinIcon from '../../static/img/icons/linkedin.inline.svg'
import CvIcon from '../../static/img/icons/cv.inline.svg'
import TriangleDown from '../../static/img/icons/triangle-down.inline.svg'

const useStyles = createUseStyles( ( { color, background } ) => ( {
  root: {
    height: '100vh',
    maxHeight: '1080px',
  },
  outerBackground: {
    zIndex: '-1',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: background.light,
    overflow: 'hidden',
  },
  innerBackground: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '101%',
    height: '100%',
    left: '-1%',
    backgroundColor: background.dark,
    borderRadius: '30vw 0px 40vw 0',
    border: `6px solid ${color.secondary}`, // Todo: replace with gradient https://css-tricks.com/examples/GradientBorder/
  },
  main: {
    marginTop: '30px',
  },
  profilePicture: {
    margin: '100px',
    overflow: 'visible !important',
    '& img': {
      borderRadius: '100vw',
      padding: '10px',
      background: background.dark,
    },
    '&:before': {
      borderRadius: '100vw',
      position: 'absolute',
      padding: '10px',
      top: '-5px',
      left: '-5px',
      right: '-5px',
      bottom: '-20px',
      content: '""',
      background: `linear-gradient(${color.secondary}, transparent)`,
      transition: '500ms all ease-in',
    },
    '&:hover:before': {
      background: `linear-gradient(${color.secondary}, ${color.secondary})`,
      top: '10px',
    },
  },
  name: {
    fontSize: '80px',
    textTransform: 'uppercase',
    color: color.secondary,
    fontWeight: 'normal',
    margin: 0,
    '& > strong:after': { content: "' '" },
  },
  roleContainer: {
    position: 'relative',
    height: '60px',
    width: '100%',
  },
  role: {
    margin: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: '55px',
    textTransform: 'uppercase',
    fontWeight: 'normal',
    letterSpacing: '0.215em',
    '& > strong:after': { content: "' '" },
  },
  iconLinks: {
    position: 'absolute',
    bottom: '20px',
  },
  icon: {
    margin: '0 15px',
    '&:hover svg :first-child': {
      fill: color.secondary,
    },
  },
  triangleDown: {
    display: 'block',
    margin: '20px auto',
  },
} ) )

const roleTransitionsConfig = {
  from: { opacity: 0, position: 'absolute' },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
}

export const HomeSectionTemplate = ( { name, roles, profilePicture, cv, github, linkedin } ) => {
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
    <section className={classes.root}>
      <div className={classes.outerBackground}>
        <div className={classes.innerBackground} />
      </div>

      <Container>

        <Container className={classes.main}>
          {profilePicture && (
            <Img
              className={classes.profilePicture}
              {...profilePicture.childImageSharp}
              backgroundColor="transparent"
            />
          )}

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

          <div className={classes.iconLinks}>
            {icons.map( ( [ href, Icon ] ) => (
              <a
                className={classes.icon}
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon />
              </a>
            ) )}

            <TriangleDown className={classes.triangleDown} />
          </div>

        </Container>

      </Container>

    </section>
  )
}

HomeSectionTemplate.propTypes = {
  name: string,
  roles: arrayOf( string ),
  profilePicture: shape( {} ),
  cv: shape( { publicURL: string } ),
  github: string,
  linkedin: string,
}

HomeSectionTemplate.defaultProps = {
  name: null,
  roles: [],
  profilePicture: null,
  cv: {},
  github: null,
  linkedin: null,
}

const query = graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "home-section"}}) {
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

export default ( props ) => (
  <StaticQuery
    query={query}
    render={withRemarkProps( withCommonData( HomeSectionTemplate ), props )}
  />
)
