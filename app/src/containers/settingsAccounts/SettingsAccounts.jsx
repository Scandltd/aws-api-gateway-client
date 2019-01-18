import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadAccountList, deleteAccount } from '../../store/actions/accountActions';
import SettingsAccountTable from "../../components/settingsAccount/settingsAccountTable/SettingsAccountTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import InnerPageWrapper from '../../components/innerPageWrapper/InnerPageWrapper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

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
        const { accounts, loading } = this.props;

        const content = loading ?
            <CircularProgress />
            :
            <SettingsAccountTable
                accounts={ accounts }
                onEdit={ this.handleEditAction }
                onDelete={ this.handleDeleteAction }
                onAdd={ this.handleAddAction }
            />
        ;

        return (
            <InnerPageWrapper
                title="Accounts"
                actions={
                    <Tooltip title="Add">
                        <IconButton aria-label="Add" onClick={ this.handleAddAction }>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                { content }
            </InnerPageWrapper>
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
})(SettingsAccounts);

SettingsAccounts.propTypes = {
    accounts: PropTypes.array.isRequired,
    loadAccountList: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};
