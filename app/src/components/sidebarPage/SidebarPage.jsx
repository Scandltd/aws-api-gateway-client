import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class SidebarPage extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container spacing={24} className={classes.root}>
                    <Grid item xs={12} md={2}>
                        { this.props.leftContent }
                    </Grid>
                    <Grid item xs={12} md={10}>
                        { this.props.mainContent }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(SidebarPage);

SidebarPage.propTypes = {
  leftContent: PropTypes.any.required,
  mainContent: PropTypes.any.required,
};
