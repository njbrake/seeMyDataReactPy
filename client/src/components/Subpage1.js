import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Chart from './Chart';

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

  componentDidMount() {
    this.interval = setInterval(e => this.onRefresh(e), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSwitch = e => {
    if (!e.target.checked) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(e => this.onRefresh(e), 10000);
    }
    this.setState({ autoUpdate: e.target.checked });
  };
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false, message: '' });
  }

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
                color="primary"
                onClick={this.onDb1Save}
                fullWidth={true}
              >
                Force Save to Database 1
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onForceRefresh}
                fullWidth={true}
              >
                Force Refresh Data
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
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
              <Chart data={data} />
            </Grid>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Typography variant="p">
              AutoUpdate {this.state.autoUpdate ? 'On' : 'Off'}
            </Typography>
            <Switch
              checked={this.state.autoUpdate}
              onChange={this.handleSwitch}
              value="autoUpdate"
            />
          </Grid>
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
