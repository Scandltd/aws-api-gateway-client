import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles/index";
import { loadAccount } from "../../store/actions/settingsAccount";
import AccountForm from '../form/account/AccountForm';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
});

class SettingsAccountEdit extends Component {

    /**
     *
     */
    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.loadAccount(id);
    }

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
        const { classes, account, loading } = this.props;
        const { id } = this.props.match.params;

        return (
            <Paper className={classes.root}>
                {loading ?
                    <CircularProgress className={ classes.progress } />
                    :
                    <AccountForm
                        onSuccess={ this.handleSuccess }
                        onCancel={ this.handleSuccess }
                        isUpdateAction={ true }
                        entityId={ id }
                        initialData={ account }
                    />
                }
            </Paper>
        );
    }
}

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        account: state.settingsAccount.account,
        loading: state.settingsAccount.loading
    }
};

export default connect(mapStateToProps, {
    loadAccount,
})(withStyles(styles)(SettingsAccountEdit));


SettingsAccountEdit.propTypes = {};