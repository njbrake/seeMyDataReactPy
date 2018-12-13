import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import BitoLogo from '../assets/BitoLogo';

const styles = theme => ({
  appBar: {
    zIndex: 9,
    backgroundColor: theme.palette.primary,
    opacity: 0.8
  },
  navLink: {
    marginRight: '20px',
    padding: '1.2rem',
    fontSize: '18px',
    '&:hover': {
      fontWeight: 600
    }
  },
  grow: {
    flexGrow: 1
  }
});

class Navbar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <BitoLogo />
          <div className={classes.grow} />
          <Button
            component={Link}
            to="/subpage1"
            color="inherit"
            className={classes.navLink}
          >
            Subpage 1
          </Button>
          <Button
            component={Link}
            to="/subpage2"
            color="inherit"
            className={classes.navLink}
          >
            Subpage 2
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
