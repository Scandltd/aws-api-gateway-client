import React, {Component} from 'react';

/**
 * 
 */
class AccountTitle extends Component
{
    render() {
        const connectButton = this.props.loaded ? <button>Reload</button> : <button>Connect</button>;

        return (
            <div className="account-item-title">
                {this.props.title}
                <div className="buttons-box">
                    {connectButton}
                    <button>Settings</button>
                </div>
            </div>
        );
    }
}

export default AccountTitle;