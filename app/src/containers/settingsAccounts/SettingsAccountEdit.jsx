import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAccount } from "../../store/actions/settingsAccount";
import AccountForm from '../form/account/AccountForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import InnerPageWrapper from '../../components/innerPageWrapper/InnerPageWrapper';

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
        const { account, loading } = this.props;
        const { id } = this.props.match.params;

        return (
            <InnerPageWrapper
                title={`Update account ${ account.name }`}
                variant="center"
            >
                {loading ?
                    <CircularProgress />
                    :
                    <AccountForm
                        onSuccess={ this.handleSuccess }
                        onCancel={ this.handleSuccess }
                        isUpdateAction={ true }
                        entityId={ id }
                        initialData={ account }
                    />
                }
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
        account: state.settingsAccount.account,
        loading: state.settingsAccount.loading
    }
};

export default connect(mapStateToProps, {
    loadAccount,
})(SettingsAccountEdit);

SettingsAccountEdit.propTypes = {};