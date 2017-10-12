import React from 'react'
import Headroom from 'react-headroom'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import SearchBar from './search-bar'

const styles = theme => ({
  root: {
    width: '100%',
  },
})

const Header = (props) => {
  const { classes } = props;
  return (
    <Headroom>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography type="title" color="inherit">
              smplRecipe
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
