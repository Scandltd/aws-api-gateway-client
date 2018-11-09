import React, {Component} from 'react';
import AccountList from './ApiList';
import AccountTitle from './AccountTitle';

/**
 * 
 */
class AccountItem extends Component
{
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            accountTitle: props.title,
            accountId: props.id,
            accountLoaded: false,
            accountApi: [],
        };
    }

    /**
     * 
     */
    render() {
        return (
            <div className="account-item">
                <AccountTitle title={this.state.accountTitle} loaded={this.state.accountLoaded}/>
                <AccountList items={this.state.accountApi}/>
            </div>
        );
    }
}

export default AccountItem;