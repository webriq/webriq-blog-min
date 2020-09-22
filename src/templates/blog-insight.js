import Layout from "../components/layout"
import React from "react"
import { graphql } from "gatsby"
import marked from "marked"

function BlogPostTemplate({ data }) {
  console.log("BlogPostTemplate -> data", data)

  const post = data.sanityInsight

  return (
    <Layout>
      <section>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: marked(post.body) }} />
      </section>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogInsightBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    sanityInsight(slug: { current: { eq: $slug } }) {
      id
      excerpt
      _createdAt(fromNow: true)
      publishedAt(fromNow: true)
      title
      mainImage {
        asset {
          fluid {
            src
          }
        }
      }
      body
      metaDescription
      metaKeywords
      metaTitle
      authors {
        person {
          name
          id
          slug {
            current
          }
        }
      }
    }
  }
`
