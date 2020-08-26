const path = require("path")

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          console.log("result.errors", result.errors)
          reject(result.errors)
        }

        return result
      })
    )
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allSanityPost(sort: { fields: publishedAt, order: ASC }) {
        edges {
          node {
            id
            title
            slug {
              current
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allSanityPost.edges
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: post.node.slug.current,
      component: blogPost,
      context: {
        slug: post.node.slug.current,
        previous,
        next,
      },
    })
  })
}
