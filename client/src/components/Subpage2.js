import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false, message: '' });
  }
  componentWillMount() {
    this.loadDb1();
  }

  loadDb1() {
    axios
      .get('/database1')
      .then(res => {
        res.data.result.sort(function(a, b) {
          return a.x - b.x;
        });
        this.setState({
          data: res.data.result,
          open: true,
          message: 'Loaded Database 1'
        });
      })
      .catch(err =>
        this.setState({ open: true, message: 'There was an error' })
      );
  }
  loadDb2() {
    axios
      .get('/database2')
      .then(res => {
        res.data.result.sort(function(a, b) {
          return a.x - b.x;
        });
        this.setState({
          data: res.data.result,
          open: true,
          message: 'Loaded Database 2'
        });
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
                onClick={this.loadDb1}
                fullWidth={true}
              >
                Load Database 1
              </Button>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.loadDb2}
                fullWidth={true}
              >
                Load Database 2
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
          <Grid item xs={6} />
          <Grid item xs={6} />
          <Grid item xs={3} />
          <Grid item xs={6} />
          <Grid item xs={3} />
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.open}
          autoHideDuration={1000}
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
Subpage2.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Subpage2);
