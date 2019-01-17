import React, { Component } from 'react';
import AccountForm from '../form/account/AccountForm';
import InnerPageWrapper from '../../components/innerPageWrapper/InnerPageWrapper';

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
        return (
            <InnerPageWrapper
                title="Add new account"
                variant="center"
            >
                <AccountForm
                    onSuccess={ this.handleSuccess }
                    onCancel={ this.handleSuccess }
                />
            </InnerPageWrapper>
        );
    }
}

export default SettingsAccountNew;

SettingsAccountNew.propTypes = {};
