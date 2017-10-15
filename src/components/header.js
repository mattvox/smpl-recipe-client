import React from 'react'
import Headroom from 'react-headroom'
import { Link } from 'react-router'
import { blueGrey, grey } from 'material-ui/colors'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import SearchBar from './search-bar'

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
    color: blueGrey[800],
  },
  bar: {
    backgroundColor: grey[100],
  }
})

const Header = (props) => {
  const { classes } = props

  return (
    <Headroom>
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <Typography type="title" className={classes.title}>
              <Link to='/'>
                <strong>SMPL RECIPE</strong>
              </Link>
            </Typography>
            <div style={{ marginLeft: 'auto' }}>
              <SearchBar />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </Headroom>
  )
}

export default withStyles(styles)(Header)
