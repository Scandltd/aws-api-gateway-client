import React, {Component} from 'react';
import './MainContainer.scss';
import AccountItem from '../../components/account/AccountItem';
import { connect } from 'react-redux';
import { loadAccountList } from '../../store/actions/accountActions';
import { loadApiList } from '../../store/actions/apiActions';
import PropTypes from 'prop-types';
import {find} from 'lodash';

/**
 * 
 */
class MainContainer extends Component
{
    /**
     * 
     */
    componentDidMount() {
        if(!this.props.loaded) {
            this.props.accountActions.loadAccounts();
        }
    }

    /**
     * 
     */
    handleLoadApiList = (id) => {
        const account = this.getAccount(id);
        if (!account) {
            console.error('account not found');        //@todo replace with message

            return ;
        }
        
        this.props.accountActions.fetchApiList(id, account.credentials);
    }

    /**
     * 
     */
    getAccount = (id) => {
        return find(this.props.accounts, {id: id});
    }

    /**
     * 
     */
    render() {
        const items = this.props.accounts.map((item, idx) => {
            let ApiList = this.props.apiList && Array.isArray(this.props.apiList[item.id]) ? this.props.apiList[item.id] : [];

            return <AccountItem 
                accountTitle={item.name} 
                accountId={item.id} 
                key={item.id} 
                apiList= {ApiList} 
                onLoadApiList={this.handleLoadApiList}
                loaded = {item.loaded}
            />;
        });

        return (
            <div className="main-page">
                {items}
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
        apiList: state.api.apiList,
        loaded: state.account.loaded
    }
};

/**
 * 
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        accountActions: {
            loadAccounts: () => dispatch(loadAccountList()),
            fetchApiList: (accountId, credentials) => dispatch(loadApiList(accountId, credentials))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

MainContainer.propTypes = {
    accounts: PropTypes.array.isRequired,
    apiList: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired
};