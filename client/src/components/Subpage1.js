import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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
      data: []
    };
    this.onDb2Save = this.onDb2Save.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
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
          data: res.data.result
        });
      })
      .catch(err => console.log(err));
  }

  //start the interval timer once component mounted
  componentDidMount() {
    this.interval = setInterval(e => this.onRefresh(e), 10000);
  }

  //Clear out the timer before unmounting to avoid memory leak
  componentWillUnmount() {
    clearInterval(this.interval);
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
          data: res.data.result
        });
      })
      .catch(err => console.log(err));
    axios
      .post('/database1', sendingData)
      .then(res => {})
      .catch(err => console.log(err));
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
        <Grid
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
          className={classes.chartContainer}
        >
          <Paper elevation={1} className={classes.paper}>
            <Chart data={data} />
          </Paper>
        </Grid>
        <Grid
          container
          xs={12}
          justify="space-around"
          alignItems="center"
          className={classes.buttonContainer}
        >
          <Grid item xs={6} />
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
      </div>
    );
  }
}
Subpage1.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Subpage1);
