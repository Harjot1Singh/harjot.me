import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'

import HTMLContent from '../components/HTMLContent'

// const pageQuery = graphql`
//   query BlogPostByID($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//         description
//         tags
//       }
//     }
//   }
// `

export const BlogPostTemplate = ( {
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
} ) => {
  const PostContent = contentComponent || HTMLContent

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: '4rem' }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map( ( tag ) => (
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
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ( { html, title, description, tags } ) => (
  <main>
    <BlogPostTemplate
      content={html}
      contentComponent={HTMLContent}
      description={description}
      helmet={(
        <Helmet titleTemplate="%s | Blog">
          <title>{`${title}`}</title>
          <meta
            name="description"
            content={`${description}`}
          />
        </Helmet>
        )}
      tags={tags}
      title={title}
    />
  </main>
)

BlogPost.propTypes = {
  data: PropTypes.shape( {
    markdownRemark: PropTypes.object,
  } ),
}

export default BlogPost

