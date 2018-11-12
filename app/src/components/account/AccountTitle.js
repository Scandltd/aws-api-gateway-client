import React, {Component} from 'react';

/**
 * 
 */
class AccountTitle extends Component
{
    handleClick = (e) => {
        this.props.onLoadApi(this.props.accountId);
    }

    render() {
        const loadBtnText = this.props.loaded ? 'Refresh' : 'Connect';

        return (
            <div className="account-item-title">
                {this.props.title}
                <div className="buttons-box">
                    <button onClick={this.handleClick}>{loadBtnText}</button>
                    <button>Settings</button>
                </div>
            </div>
        );
    }
}

export default AccountTitle;