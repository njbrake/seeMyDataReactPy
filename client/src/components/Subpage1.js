import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  Scatter,
  ScatterChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const styles = theme => ({
  root: {
    flexGrow: 1
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
    this.onRefresh = this.onRefresh.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentWillMount() {
    axios.get('/random').then(res => {
      console.log(res.data.result);
      this.setState({ data: res.data.result });
    });
  }
  onClick(e) {
    axios
      .get('/random')
      .then(res => {
        this.setState({
          data: res.data.result
        });
      })
      .catch(err => console.log(err));
  }
  onRefresh() {
    axios
      .get('/random')
      .then(res => {
        this.setState({
          data: res.data.result
        });
      })
      .catch(err => console.log(err));
  }
  onSave() {
    const sendingData = this.state.data;
    console.log(sendingData);
    axios
      .post('/database1', sendingData)
      .then(res => {
        console.log(res.data.result);
      })
      .catch(err => console.log(err));
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid
            container
            xs={12}
            justify="center"
            alignItems="center"
            className={classes.buttonContainer}
          >
            <Grid item xs={3}>
              <Button variant="contained" color="primary" onClick={this.onSave}>
                Save to Database
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onClick}
              >
                Refresh Data
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onClick}
              >
                Save to Database
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
              <LineChart
                width={1000}
                height={500}
                data={this.state.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="x" stroke="#8884d8" />
                <Line type="monotone" dataKey="y" stroke="#82ca9d" />
              </LineChart>
            </Grid>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6} />
        </Grid>
      </div>
    );
  }
}
Subpage1.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Subpage1);
