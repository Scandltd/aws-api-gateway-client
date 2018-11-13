import React, {Component} from 'react';
import AccountList from './ApiList';
import AccountTitle from './AccountTitle';
import PropTypes from 'prop-types';

/**
 * 
 */
class AccountItem extends Component
{
    /**
     * 
     */
    handleLoadApi = () => {
        this.props.onLoadApiList(this.props.accountId);
    }

    /**
     * 
     */
    render() {
        return (
            <div className="account-item">
                <AccountTitle title={this.props.accountTitle} loaded={this.props.loaded} accountId={this.props.accountId} onLoadApi={this.handleLoadApi}/>
                <AccountList items={this.props.apiList} accountId={this.props.accountId}/>
            </div>
        );
    }
}

export default AccountItem;

AccountItem.propTypes = {
    accountId: PropTypes.any.isRequired,
    accountTitle: PropTypes.string.isRequired,
    apiList: PropTypes.array.isRequired,
    loaded: PropTypes.bool.isRequired,
    onLoadApiList: PropTypes.func.isRequired
};
