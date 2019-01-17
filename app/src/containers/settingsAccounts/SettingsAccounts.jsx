import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadAccountList, deleteAccount } from '../../store/actions/accountActions';
import SettingsAccountTable from "../../components/settingsAccount/settingsAccountTable/SettingsAccountTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class SettingsAccounts extends Component {
    /**
     *
     */
    componentDidMount() {
      this.props.loadAccountList();
    }

    /**
     *
     * @param id
     */
    handleEditAction = (id) => {
        this.props.history.push(`/settings/account/${id}/edit`);
    };

    /**
     *
     */
    handleAddAction = () => {
        this.props.history.push('/settings/account/new');
    };

    /**
     *
     * @param id
     */
    handleDeleteAction = (id) => {
        this.props.deleteAccount(id)
            .then(data => {
                this.props.loadAccountList();
            });
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { accounts, loading, classes } = this.props;

        const content = loading ?
            <CircularProgress className={ classes.progress } />
            :
            <SettingsAccountTable
                accounts={ accounts }
                onEdit={ this.handleEditAction }
                onDelete={ this.handleDeleteAction }
                onAdd={ this.handleAddAction }
            />
        ;

        return (
            <div>
                { content }
            </div>
        );
    }
}

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        accounts: state.account.accounts,
        loading: state.account.loading
    }
};

export default connect(mapStateToProps, {
    loadAccountList,
    deleteAccount,
})(withStyles(styles)(SettingsAccounts));

SettingsAccounts.propTypes = {
    accounts: PropTypes.array.required,
    loadAccountList: PropTypes.func.required,
    deleteAccount: PropTypes.func.required,
};
