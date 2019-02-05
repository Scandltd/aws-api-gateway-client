import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    tabComponent: {
        padding: theme.spacing.unit * 3,
    },
});

class TabContent extends Component {
    render() {
        const { classes, children } = this.props;

        return (
            <Typography component="div" className={ classes.tabComponent }>
                { children }
            </Typography>
        );
    }
}

export default withStyles(styles)(TabContent);

TabContent.propTypes = {};
