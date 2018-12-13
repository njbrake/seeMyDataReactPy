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

class Subpage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      message: ''
    };
    this.loadDb1 = this.loadDb1.bind(this);
    this.loadDb2 = this.loadDb2.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //handle snackbar close
  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false, message: '' });
  }

  //start with loading db2
  componentWillMount() {
    this.loadDb2();
  }

  //manually load db1
  loadDb1() {
    axios
      .get('/database1')
      .then(res => {
        res.data.result.sort(function(a, b) {
          return a.x - b.x;
        });
        if (res.data.result.length > 100) {
          this.setState({
            data: res.data.result,
            open: true,
            message: 'Error: Over 100 Items Present in Data'
          });
        } else {
          this.setState({
            data: res.data.result,
            open: true,
            message: 'Loaded Database 1'
          });
        }
      })
      .catch(err =>
        this.setState({ open: true, message: 'There was an error' })
      );
  }

  //manually load db2
  loadDb2() {
    axios
      .get('/database2')
      .then(res => {
        res.data.result.sort(function(a, b) {
          return a.x - b.x;
        });
        if (res.data.result.length > 100) {
          this.setState({
            data: res.data.result,
            open: true,
            message: 'Error: Over 100 Items Present in Data'
          });
        } else {
          this.setState({
            data: res.data.result,
            open: true,
            message: 'Loaded Database 2'
          });
        }
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
            item
            xs={12}
            justify="center"
            alignItems="center"
            className={classes.chartContainer}
          >
            <Grid>
              <Paper elevation={1} className={classes.paper}>
                <Chart data={data} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
Subpage2.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Subpage2);
