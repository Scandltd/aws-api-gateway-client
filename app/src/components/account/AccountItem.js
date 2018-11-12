import React, {Component} from 'react';
import AccountList from './ApiList';
import AccountTitle from './AccountTitle';
import AwsApiGateway from '../../services/aws/AwsApiGateway';
import AccountContext from '../../components/contexts/AccountContext';
import {find} from 'lodash';

/**
 * 
 */
class AccountItem extends Component
{
    static contextType = AccountContext;

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
            loading: false,
            errorMessage: null
        };
    }

    addErrorMessage = (message) => {
        this.setState({errorMessage: message});
    }

    clearErrorMessage = () => {
        this.setState({errorMessage: null});
    }

    handleLoadApi = (id) => {
        console.log('connect', id);
        const Api = this.getProviderById(id);

        this.setState({
            accountApi: [], 
            loading: true, 
            errorMessage: null
        });
        Api.getApiList()
            .then((result) => {
                console.log('susccess', result);
                this.setState({accountApi: result.items, 'loading': false, 'accountLoaded': true});
            })
            .catch((err) => {
                console.log('exception', err);
                this.setState({loading: false, accountLoaded: false, errorMessage: err.message});
            });



        console.log('connect', id);
    }

    getProviderById(id) {
        const account = find(this.context.accounts, {id: id});
        if (!account) {
            this.addErrorMessage('Unable to find credentials');
            return ;
        }

        const credentials = account.credentials;
        return new AwsApiGateway(credentials.accessKeyId, credentials.secretAccessKey, credentials.region);
    }

    getNotificationBox = () => {
        if (this.state.loading) {
            return <div className='notificationBoxLoading'>Loading...</div>;
        }

        if (this.state.errorMessage) {
            return <div className="notificationBoxError">this.state.errorMessage</div>;
        }

        return null;
    }

    /**
     * 
     */
    render() {
        return (
            <div className="account-item">
                <AccountTitle title={this.state.accountTitle} loaded={this.state.accountLoaded} accountId={this.state.accountId} onLoadApi={this.handleLoadApi}/>
                <AccountList items={this.state.accountApi}/>
                {this.getNotificationBox()}
            </div>
        );
    }
}

export default AccountItem;