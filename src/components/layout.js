/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  
  // When embedded in an iFrame, sends a postMessage "WEBRIQ_SITE_HAS_LOADED" to parent
  const [hasLoaded, setHasLoaded] = React.useState(false)
  React.useEffect(() => {
    const sendPostMessage = e => {
      if (!hasLoaded) {
        console.log("Sending postMessage: WEBRIQ_SITE_HAS_LOADED")
        window.parent.postMessage("WEBRIQ_SITE_HAS_LOADED", "*")
        console.log("Successfully sent postMessage: WEBRIQ_SITE_HAS_LOADED")
        setHasLoaded(true)
      }
    }

    sendPostMessage()
  }, [hasLoaded])

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
