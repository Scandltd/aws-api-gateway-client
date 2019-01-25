import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import cn from 'classnames';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit,
        width: '100%',
    },
    contentWrapper: {
        padding: theme.spacing.unit * 3,
    },
    rootToolbar: {
        paddingRight: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
        display: 'flex',
    },
    title: {
        flex: '0 0 auto',
    },
    toolbarCenter: {
        justifyContent: 'center',
    },
    contentCenter: {
        display: 'flex',
        justifyContent: 'center',
    }
});

class InnerPageWrapper extends Component {
    render() {
        const { classes, title, actions, children, variant } = this.props;

        return (
            <Paper className={ classes.root }>
                <Toolbar className={cn(classes.rootToolbar, { [classes.toolbarCenter]: variant === 'center'})}>
                    <div className={ classes.title }>
                        <Typography variant="h6" id="tableTitle">
                            { title }
                        </Typography>
                    </div>
                    {variant !== 'center' && <div className={ classes.spacer } />}
                    {actions &&
                        <div className={ classes.actions }>
                            { actions }
                        </div>
                    }
                </Toolbar>
                <Divider light />
                <div className={cn(classes.contentWrapper, { [classes.contentCenter]: variant === 'center'}) }>
                    { children }
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(InnerPageWrapper);

InnerPageWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    actions: PropTypes.node,
    variant: PropTypes.string,
};
