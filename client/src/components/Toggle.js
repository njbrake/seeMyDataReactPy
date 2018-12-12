import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const styles = {};

class Toggle extends React.Component {
  render() {
    const { classes, autoUpdate, handleSwitch } = this.props;
    return (
      <Switch
        checked={autoUpdate}
        onChange={handleSwitch}
        value="autoUpdate"
        align="center"
        className={classes.pos}
      />
    );
  }
}

Toggle.propTypes = {
  classes: PropTypes.object.isRequired,
  autoUpdate: PropTypes.bool.isRequired,
  handleSwitch: PropTypes.func.isRequired
};

export default withStyles(styles)(Toggle);
