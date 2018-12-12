import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Video from '../assets/landingVid.mp4';
const styles = theme => ({
  landing: {
    position: 'absolute',
    height: '100vh',
    display: 'flex',
    alignItems: 'top',
    top: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    overflow: 'hidden',
    flexGrow: 1,
    width: '100%',
    zIndex: 1
  },

  headerContainer: {
    minHeight: '90vh'
  },

  header: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 800,
    background: 'transparent',
    opacity: '.9',
    padding: '40px 20px 20px 20px',
    margin: '60px 30px 50px 30px',
    zIndex: '2'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    opacity: '0.8'
  }
});

class Landing extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landing}>
        <Grid
          container
          className={classes.header}
          direction="row"
          justify="space-evenly"
          alignItems="flex-end"
          spacing={24}
        >
          <Grid item xs={3}>
            <Button
              variant="contained"
              component={Link}
              to="/subpage1"
              color="secondary"
              size="large"
              fullWidth={true}
            >
              Subpage1
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              component={Link}
              to="/subpage2"
              size="large"
              color="secondary"
              fullWidth={true}
            >
              Subpage2
            </Button>
          </Grid>
        </Grid>
        <div className={classes.video}>
          <video
            autoPlay
            loop
            muted
            style={{
              minHeight: '100%',
              minWidth: '100%',
              width: 'auto',
              height: 'auto',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)'
            }}
          >
            <source src={Video} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Landing);
