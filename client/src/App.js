import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Landing from './components/Landing';
import Subpage1 from './components/Subpage1';
import Subpage2 from './components/Subpage2';

import BitoLogo from './assets/BitoLogo';
import Background from '../assets/landing.jpg';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242'
    },
    secondary: {
      main: '#fafafa'
    }
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex'
  },
  backgroundImage: {
    minHeight: ' 100vh',
    background: `url(${Background}) center center`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: .4;
    width: '100%'.
    height: '100%',
    zIndex: -1,
    overflow: 'hidden',
    display: 'flex'
  },
  }
  appBar: {
    zIndex: 9,
    backgroundColor: theme.palette.primary,
    opacity: 0.8
  },
  navLink: {
    textDecoration: 'none',
    color: 'white',
    marginRight: '1vw',
    fontSize: '20px'
  },
  grow: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
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
            <div className={classes.backgroundImage} />
            <div className="wrapper">
              <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                  <Toolbar>
                    <BitoLogo />
                    <div className={classes.grow} />

                    <Tabs
                      indicatorColor="secondary"
                      centered={false}
                      style={{ marginLeft: '1vw' }}
                      value={this.state.activePage}
                    >
                      <NavLink to="/" className={classes.navLink}>
                        <Tab
                          label="Home"
                          value={0}
                          onChange={(e, value) => this.onChange(e, value)}
                        />
                      </NavLink>
                      <NavLink to="/subpage1" className={classes.navLink}>
                        <Tab
                          label="Subpage 1"
                          value={1}
                          onChange={(e, value) => this.onChange(e, value)}
                        />
                      </NavLink>
                      <NavLink to="/subpage2" className={classes.navLink}>
                        <Tab
                          label="Subpage 2"
                          value={2}
                          onChange={(e, value) => this.onChange(e, value)}
                        />
                      </NavLink>
                    </Tabs>
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
