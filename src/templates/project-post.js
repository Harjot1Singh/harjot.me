import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'

import HTMLContent from '../components/HTMLContent'

// const pageQuery = graphql`
//   query ProjectPostById($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//         description
//         technologies
//       }
//     }
//   }
// `

export const ProjectPostTemplate = ( {
  content,
  contentComponent,
  description,
  technologies,
  title,
  helmet,
  html,
} ) => (
  <section className="section">
    {helmet || ''}
    <div className="container content">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
            {title}
          </h1>
          <p>{description}</p>
          <HTMLContent>{html}</HTMLContent>
          {technologies && technologies.length ? (
            <div style={{ marginTop: '4rem' }}>
              <h4>Tags</h4>
              <ul className="taglist">
                {technologies.map( ( tag ) => (
                  <li key={`${tag}tag`}>
                    <Link to={`/tags/${kebabCase( tag )}/`}>{tag}</Link>
                  </li>
                ) )}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </section>
)

ProjectPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ( { data } ) => {
  const { markdownRemark: post } = data

  return (
    <main>
      <ProjectPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={(
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        )}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </main>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape( {
    markdownRemark: PropTypes.object,
  } ),
}

export default BlogPost

