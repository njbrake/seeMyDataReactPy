import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';

import Subpage1 from './components/Subpage1';
import Subpage2 from './components/Subpage2';
import Navbar from './components/Navbar';

import subpage from './assets/subpage.png';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242' //Slate Gray color
    },
    secondary: {
      main: '#fdd835' //Yellow Color
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
    backgroundImage: `url(${subpage})`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    display: 'flex',
    zIndex: -1
  },
  content: {
    flexGrow: 1,
    minWidth: 0
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <div className="wrapper">
              <div className={classes.root}>
                <Navbar />
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Route exact path="/" component={Subpage1} />
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
