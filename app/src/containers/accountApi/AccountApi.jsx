import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadRestApiListRequest, deleteRestApiRequest, getRestApiRequest } from "../../store/actions/apiActions";
import { connect } from "react-redux";
import ApiListComponent from '../../components/account/ApiList';
import './accoutApiContainer.scss';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';
import RestApiForm from '../form/restApi/RestApiForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import InnerPageWrapper from '../../components/innerPageWrapper/InnerPageWrapper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

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
            isDataLoading: false
        };
    }

    /**
     *
     */
    componentDidMount()  {
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
        this.setState({open:true, isDataLoading: true});
        this.props.actions.getRestApi(
            this.props.accountId,
            apiId,
            (response) => {
                this.setState({
                    open: true,
                    isUpdateAction: true,
                    entityId: apiId,
                    isDataLoading: false,
                    initialData: {
                        name: response.name,
                        description: response.description,
                        type: response.endpointConfiguration.types[0] || ''
                    }
                });
            },
            (err) => {
                console.log('error. Unable to fetch rest api data', err);
            });
    };

    /**
     *
     * @returns {*}
     */
    render() {
        let apiList = this.props.apiList && Array.isArray(this.props.apiList[this.props.accountId]) ? this.props.apiList[this.props.accountId] : [];

        return (
            <InnerPageWrapper
                title="REST APIs"
                actions={
                    <Tooltip title="Add">
                        <IconButton aria-label="Add" onClick={ this.handleAddClick } >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <ApiListComponent
                    items={apiList}
                    accountId={this.props.accountId}
                    onDeleteApi={this.handleDelete}
                    onUpdateApi={this.handleUpdate}
                />

                <DialogFormComponent open={this.state.open} title={this.state.isUpdateAction ? 'Update REST API' : 'Create REST API'}>
                    {this.state.isDataLoading ?
                        <CircularProgress />
                        :
                        <RestApiForm
                            accountId={this.props.accountId}
                            onCancel={this.handleClose}
                            onSuccess={this.handleClose}
                            isUpdateAction={this.state.isUpdateAction}
                            entityId={this.state.entityId}
                            initialData={this.state.initialData}
                        />
                    }
                </DialogFormComponent>
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
            deleteRestApi: (accountId, apiId) => dispatch(deleteRestApiRequest(accountId, apiId)),
            getRestApi: (accountId, apiId, onSuccess = null, onError = null) => dispatch(getRestApiRequest(accountId, apiId, onSuccess, onError))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (AccountApi);

AccountApi.propTypes = {
    accountId: PropTypes.any.isRequired,
    apiList: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired
};
