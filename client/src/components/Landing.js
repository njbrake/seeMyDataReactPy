import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Background from '../assets/landing.jpg';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '92 vh',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
    overflow: 'hidden',
    display: 'flex'
  },
  headerContainer: {
    minHeight: '90vh'
  },
  header: {
    color: 'white',
    fontSize: '50px',
    fontWeight: 800
  }
});

class Landing extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={24}
          justify="center"
          alignItems="center"
          className={classes.headerContainer}
        >
          <Grid item xs={12}>
            <Typography
              variant="display4"
              align="center"
              className={classes.header}
            >
              Welcome to Nate Brake's Web Application for Bito Robotics
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}
Landing.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Landing);
