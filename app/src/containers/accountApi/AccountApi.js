import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {loadRestApiListRequest, deleteRestApiRequest } from "../../store/actions/apiActions";
import { connect } from "react-redux";
import ApiListComponent from '../../components/account/ApiList';
import AccountApiHeader from '../../components/account/AccountApiHeader';
import './accoutApiContainer.scss';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';

import RestApiForm from '../form/restApi/RestApiForm';

/**
 *
 */
class AccountApi extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isUpdateAction: false,
            entityId: null,
            initialData: {},
        };
    }

    /**
     *
     */
    componentDidMount() {
        if (!this.props.apiList[this.props.accountId]) {
            this.fetchApiList();
        }
    }

    /**
     *
     */
    fetchApiList = () => {
        this.props.actions.fetchApiList(this.props.accountId);
    };

    /**
     *
     */
    handleAddClick = () => {
        this.setState({
            open: true,
            isUpdateAction: false,
            entityId: null,
            initialData: {}
        });
    };

    /**
     *
     */
    handleClose = () => {
        this.setState({ open: false });
    };

    /**
     *
     * @param apiId
     */
    handleDelete = (apiId) => {
        this.props.actions.deleteRestApi(this.props.accountId, apiId);
    };

    /**
     *
     * @param apiId
     */
    handleUpdate = (apiId) => {
        this.setState({
            open: true,
            isUpdateAction: false,
            entityId: apiId,
            initialData: {}
        });
    };

    /**
     *
     * @returns {*}
     */
    render() {
        let apiList = this.props.apiList && Array.isArray(this.props.apiList[this.props.accountId]) ? this.props.apiList[this.props.accountId] : [];

        return (
            <div className="account-api-container">
                <AccountApiHeader title="APIs" buttonTitle="Add" onButtonClick={this.handleAddClick} />

                <ApiListComponent
                    items={apiList}
                    accountId={this.props.accountId}
                    onDeleteApi={this.handleDelete}
                    onUpdateApi={this.handleUpdate}
                />

                <DialogFormComponent open={this.state.open} title="Add a new API">
                    <RestApiForm
                        accountId={this.props.accountId}
                        onCancel={this.handleClose}
                        onSuccess={this.handleClose}
                        isUpdateAction={this.state.isUpdateAction}
                        entityId={this.state.entityId}
                        initialData={this.state.initialData}
                    />
                </DialogFormComponent>
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
        actions: {
            fetchApiList: (accountId) => dispatch(loadRestApiListRequest(accountId)),
            deleteRestApi: (accountId, apiId) => dispatch(deleteRestApiRequest(accountId, apiId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (AccountApi);

AccountApi.propTypes = {
    accountId: PropTypes.any.isRequired,
    apiList: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired
};
