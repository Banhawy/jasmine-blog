import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./styles.css"
import 'fontsource-roboto';
import { Paper } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7EDDD3",
      main: "#81D8D0",
      dark: "#34AB9F"
    },
    secondary: {
      main: "#D9828B"
    },
    // type: 'dark'
  }
})

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Header
          siteTitle={data.site.siteMetadata.title}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <div className="container">
          <main>{children}</main>
        </div>
        <Footer />
      </Paper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
