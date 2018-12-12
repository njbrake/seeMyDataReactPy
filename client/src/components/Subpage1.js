import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';

import Chart from './Chart';
import Toggle from './Toggle';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '1vh'
  },
  buttonContainer: {
    paddingTop: '15px',
    paddingBottom: '15px'
  },
  chartContainer: {
    paddingTop: '15px'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});
class Subpage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      message: '',
      autoUpdate: true
    };
    this.onForceRefresh = this.onForceRefresh.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.onDb1Save = this.onDb1Save.bind(this);
    this.onDb2Save = this.onDb2Save.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  //Send request for data before Mounting
  componentWillMount() {
    axios
      .get('/random')
      .then(res => {
        res.data.result.sort(function(a, b) {
          return a.x - b.x;
        });
        this.setState({
          data: res.data.result,
          open: true,
          message: 'Random Items Updated'
        });
      })
      .catch(err =>
        this.setState({ open: true, message: 'There was an error' })
      );
  }

  //start the interval timer once component mounted
  componentDidMount() {
    this.interval = setInterval(e => this.onRefresh(e), 10000);
  }

  //Clear out the timer before unmounting to avoid memory leak
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //Handle toggling autoupdate
  handleSwitch = e => {
    if (!e.target.checked) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(e => this.onRefresh(e), 10000);
    }
    this.setState({ autoUpdate: e.target.checked });
  };

  //Close the snackbar
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false, message: '' });
  }

  //manual refresh
  onForceRefresh(e) {
    e.preventDefault();
    axios
      .get('/random')
      .then(res => {
        res.data.result.sort(function(a, b) {
          return a.x - b.x;
        });
        this.setState({
          data: res.data.result,
          open: true,
          message: 'Random Items Updated'
        });
      })
      .catch(err =>
        this.setState({ open: true, message: 'There was an error' })
      );
  }

  //Auto Refresh
  onRefresh() {
    const sendingData = this.state.data;
    axios
      .get('/random')
      .then(res => {
        res.data.result.sort(function(a, b) {
          return a.x - b.x;
        });
        this.setState({
          data: res.data.result,
          open: true,
          message: 'Random Items Updated'
        });
      })
      .catch(err =>
        this.setState({ open: true, message: 'There was an error' })
      );
    axios
      .post('/database1', sendingData)
      .then(res => {
        this.setState({ open: true, message: 'Saved to Database 1' });
      })
      .catch(err =>
        this.setState({ open: true, message: 'There was an error' })
      );
  }

  //Manually save to Db1
  onDb1Save(e) {
    e.preventDefault();
    const sendingData = this.state.data;
    axios
      .post('/database1', sendingData)
      .then(res => {
        this.setState({ open: true, message: 'Saved to Database 1' });
      })
      .catch(err =>
        this.setState({ open: true, message: 'There was an error' })
      );
  }

  //Manually save to Db2
  onDb2Save(e) {
    e.preventDefault();
    const sendingData = this.state.data;
    axios
      .post('/database2', sendingData)
      .then(res => {
        this.setState({ open: true, message: 'Saved to Database 2' });
      })
      .catch(err =>
        this.setState({ open: true, message: 'There was an error' })
      );
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid
            container
            xs={12}
            justify="space-around"
            alignItems="center"
            className={classes.buttonContainer}
          >
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.onDb1Save}
                fullWidth={true}
              >
                Force Save to Database 1
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.onForceRefresh}
                fullWidth={true}
              >
                Force Refresh Data
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.onDb2Save}
                fullWidth={true}
              >
                Save to Database 2
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignItems="center"
            className={classes.chartContainer}
          >
            <Grid>
              <Paper elevation={1} className={classes.paper}>
                10 Second Auto Update {this.state.autoUpdate ? 'On' : 'Off'}
                <Toggle
                  autoUpdate={this.state.autoUpdate}
                  handleSwitch={this.handleSwitch}
                />
                <Chart data={data} />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={6} />
          <Grid item xs={1} />
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.open}
          autoHideDuration={900}
          onClose={this.handleClose}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}
Subpage1.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Subpage1);
