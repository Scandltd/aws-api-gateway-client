import React, { Component } from 'react';
import AccountForm from '../form/account/AccountForm';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
});

/**
 *
 */
class SettingsAccountNew extends Component {
    /**
     *
     */
    handleSuccess = () => {
        this.props.history.push('/settings/account');
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <AccountForm
                  onSuccess={ this.handleSuccess }
                  onCancel={ this.handleSuccess }
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(SettingsAccountNew);

SettingsAccountNew.propTypes = {};
