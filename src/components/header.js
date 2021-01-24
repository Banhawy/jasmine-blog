import { Link, useStaticQuery, graphql, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { FiMenu } from "react-icons/fi"
import { MdClose } from "react-icons/md"
import { IoIosSearch } from "react-icons/io"
import AppBar from "@material-ui/core/AppBar"
import { Toolbar, makeStyles, Menu, MenuItem } from "@material-ui/core"
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "flex-start"
  },
  logo: {
    flexGrow: 3
  },
  nav: {
    float: "right"
  }
}));

const Header = ({ siteTitle, menuOpen, setMenuOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl);
  const data = useStaticQuery(graphql`
    {
      allTopicsJson {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `)

  const classes = useStyles()

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar className={classes.toolbar}>
          <button
            id="site-logo-wrapper"
            className={classes.logo}
            onClick={() => {
              if (menuOpen) {
                setMenuOpen(false)
              }
            }}
          >
            <Link
              to="/"
              id="site-logo"
              style={{
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </button>

          <nav id="nav" className={classes.nav}>
            <ul>
              {data.allTopicsJson.edges.map(({ node }) => (
                <li key={node.slug}>
                  <Link to={`/${node.slug}`}>{node.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
            <div id="search-box">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  navigate(`/?s=${e.target.query.value.toLowerCase()}`)
                }}
              >
                <input type="text" id="query" aria-label="Search" />
              </form>
              <IoIosSearch />
            </div>
            {menuOpen ? (
              <button className="menu-button" onClick={() => setMenuOpen(false)}>
                <MdClose />
              </button>
            ) : (
                <button className="menu-button" onClick={handleMenuClick}>
                  <FiMenu />
                </button>
              )}
          </nav>
        </Toolbar>
        {menuOpen && (
          <Menu
            id="menu"
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {data.allTopicsJson.edges.map(({ node }) => (
              <MenuItem key={node.slug} onClick={handleClose}>
                <Link to={`/${node.slug}`}>{node.name}</Link>
              </MenuItem>
            ))}
            <MenuItem>
              <Link to="/about">About</Link>
            </MenuItem>
          </Menu>
        )}
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
