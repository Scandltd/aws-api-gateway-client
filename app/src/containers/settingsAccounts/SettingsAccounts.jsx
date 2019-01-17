import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadAccountList } from '../../store/actions/accountActions';
import SettingsAccountTable from "../../components/settingsAccount/settingsAccountTable/SettingsAccountTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class SettingsAccounts extends Component {
    componentDidMount() {
      this.props.loadAccountList();
    }

    /**
     *
     * @param id
     */
    handleEditAction = (id) => {
        console.log('edit', id);
        this.props.history.push(`/settings/account/${id}/edit`);
    };

    /**
     *
     */
    handleAddAction = () => {
        this.props.history.push('/settings/account/add');
    };

    /**
     *
     * @param id
     */
    handleDeleteAction = (id) => {
      console.log('delete', id);
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
})(withStyles(styles)(SettingsAccounts));

SettingsAccounts.propTypes = {
    accounts: PropTypes.array.required,
    loadAccountList: PropTypes.func.required,
};
