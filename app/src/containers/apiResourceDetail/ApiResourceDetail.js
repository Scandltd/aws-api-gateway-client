import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { loadResources, deleteResourceApiRequest, deleteMethodApiRequest } from '../../store/actions/entriesActions';
import { addErrorNotification } from '../../store/actions/notificationActions';
import EntriesTree from '../../components/entriesTree/EntriesTree';
import arrayToTree from 'array-to-tree';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';
import RestApiResourceForm from '../form/restApiResource/RestApiResourceForm';
import StepperRestApiMethodForm from '../../containers/form/method/StepperRestApiMethodForm';
import ResourceActionEnum from '../../enum/resourceActionsEnum';

/**
 * 
 */
class ApiResourceDetail extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            accountId: props.match.params.accountId,
            apiId: props.match.params.apiId,
            resourceAction: null,
            activeResourceId: null
        };
    }

    /**
     *
     */
    componentDidMount() {
        if (!this.props.entries[this.state.apiId]) {
            this.props.actions.loadResources(this.state.accountId, this.state.apiId);
        }
    }

    /**
     *
     * @returns {Array}
     */
    getEntries = () => {
        return this.props.entries && Array.isArray(this.props.entries[this.state.apiId]) ? this.props.entries[this.state.apiId] : [];
    };

    /**
     *
     * @returns {Array}
     */
    buildTree = () => {
        return arrayToTree(this.getEntries(), {
            parentProperty: 'parentId',
            customID: 'id'
        });
    };

    /**
     *
     */
    flushResourceAction = () => {
        this.setState({
            resourceAction: null,
            activeResourceId: null
        });
    };

    /**
     *
     * @param resourceId
     * @param action
     */
    handleInitResourceAction = (resourceId, action) => {
        switch (action) {
            case ResourceActionEnum.DELETE_RESOURCE:
                this.deleteResource(resourceId);
                break;

            case ResourceActionEnum.CREATE_HTTP_METHOD:
            case ResourceActionEnum.CREATE_RESOURCE:
                this.setState({
                    resourceAction: action,
                    activeResourceId: resourceId
                });
                break;

            default:
                this.props.actions.addErrorNotification('Unknown action');
                break;
        }
    };

    /**
     *
     * @param resourceId
     * @param httpMethod
     * @param action
     */
    handleInitHttpMethodAction = (resourceId, httpMethod, action) => {
        switch (action) {
            case ResourceActionEnum.DELETE_HTTP_METHOD:
                this.props.actions.deleteMethodApiRequest(this.state.accountId, this.state.apiId, resourceId, httpMethod);
                break;

            default:
                this.props.actions.addErrorNotification('Unknown action');
                break;
        }
    };

    /**
     *
     * @param resourceId
     */
    deleteResource = (resourceId) => {
        this.props.actions.deleteResource(this.state.accountId, this.state.apiId, resourceId);
    };

    /**
     *
     */
    onCloseDialog = () => {
        this.flushResourceAction();
    };

    /**
     *
     * @param resourceId
     *
     * @returns {*}
     */
    findResourceById = (resourceId) => {
        return find(this.props.entries[this.state.apiId], {id: resourceId});
    };

    /**
     *
     * @returns {*}
     */
    renderForm = () => {
        if (!Boolean(this.state.resourceAction)) {
            return null;
        }

        let form = null;
        let title = '';
        const resource = this.findResourceById(this.state.activeResourceId);
        if (!resource) {
            this.props.actions.addErrorNotification('Unknown resource');

            return null;
        }

        switch (this.state.resourceAction) {
            case ResourceActionEnum.CREATE_RESOURCE:
                    form = <RestApiResourceForm
                        basePath={resource.path}
                        accountId={this.state.accountId}
                        restApiId={this.state.apiId}
                        parentResourceId={resource.id}
                        isUpdateAction={false}
                        onSuccess={this.flushResourceAction}
                        onCancel={this.flushResourceAction}
                    />;
                    title = 'Create a new resource';
                break;

            case ResourceActionEnum.CREATE_HTTP_METHOD:
                form = <StepperRestApiMethodForm
                    accountId={this.state.accountId}
                    restApiId={this.state.apiId}
                    resource={resource}
                    onCancel={this.flushResourceAction}
                    onSuccess={this.flushResourceAction}
                />;
                title = 'Create a new HTTP method';
                break;

            default:
                break;
        }

        return (
            <DialogFormComponent open={true} title={title} onClose={this.onCloseDialog}>
                {form}
            </DialogFormComponent>
        );
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <div>
                API detail page. Account id: {this.props.match.params.accountId} | Api id: {this.props.match.params.apiId}
                <EntriesTree
                    treeEntries={this.buildTree()}
                    handleInitResourceAction={this.handleInitResourceAction}
                    handleInitHttpMethodAction={this.handleInitHttpMethodAction}
                />
                {this.renderForm()}
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
        entries: state.entries.entries,
        loaded: false
    }
};

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadResources: (accountId, apiId) => dispatch(loadResources(accountId, apiId)),
            deleteResource: (accountId, apiId, resourceId) => dispatch(deleteResourceApiRequest(accountId, apiId, resourceId)),
            addErrorNotification: (message) => dispatch(addErrorNotification(message)),
            deleteMethodApiRequest: (accountId, apiId, resourceId, httpMethod) => dispatch(deleteMethodApiRequest(accountId, apiId, resourceId, httpMethod))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiResourceDetail);