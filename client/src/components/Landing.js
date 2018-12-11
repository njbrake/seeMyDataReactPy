import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '92 vh',
    zIndex: 1,
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
              Nate Brake
              Web Application for Bito Robotics
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button variant="raised" component={Link} to="/subpage1" >Subpage1 </Button>
          </Grid>
          <Grid item xs={6}>
             <Button variant="raised" component={Link} to="/subpage2">Subpage2 </Button>
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
