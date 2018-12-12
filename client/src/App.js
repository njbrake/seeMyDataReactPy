import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Landing from './components/Landing';
import Subpage1 from './components/Subpage1';
import Subpage2 from './components/Subpage2';

import BitoLogo from './assets/BitoLogo';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242'
    },
    secondary: {
      main: '#fdd835'
    }
  },
  typography: {
    fontFamily: "'Allerta', Helvetica, Arial, sans-serif",
    textTransform: 'none'
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor: 'white',
    overflow: 'hidden',
    display: 'flex',
    zIndex: -1
  },
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
  },
  content: {
    flexGrow: 1,
    opacity: '1 !important',
    //padding: theme.spacing.unit * 1,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: null
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e, value) {
    this.setState({ activePage: value });
  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <div className="wrapper">
              <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                  <Toolbar>
                    <BitoLogo />
                    <div className={classes.grow} />

                    <Button
                      component={Link}
                      to="/"
                      color="inherit"
                      className={classes.navLink}
                    >
                      Home
                    </Button>
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

                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/subpage1" component={Subpage1} />
                  <Route exact path="/subpage2" component={Subpage2} />
                </main>
              </div>
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
