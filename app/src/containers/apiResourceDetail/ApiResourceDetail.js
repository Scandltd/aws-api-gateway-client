import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { loadResources, deleteResourceApiRequest } from '../../store/actions/entriesActions';
import { addErrorNotification } from '../../store/actions/notificationActions';
import EntriesTree from '../../components/entriesTree/EntriesTree';
import arrayToTree from 'array-to-tree';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';
import RestApiResourceForm from '../form/restApiResource/RestApiResourceForm';
import StepperRestApiMethodForm from '../../containers/form/method/StepperRestApiMethodForm';

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
        console.log('resource init', resourceId, action);       //@todo remove it
        switch (action) {
            case 'delete_resource':
                this.deleteResource(resourceId);
                break;

            case 'create_method':
            case 'create_resource':
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
            case 'create_resource':
                    form = <RestApiResourceForm
                        basePath={resource.path}
                        accountId={this.state.accountId}
                        restApiId={this.state.apiId}
                        parentResourceId={resource.id}
                        isUpdateAction={false}
                        onSuccess={this.flushResourceAction}
                    />;
                    title = 'Create a new resource';
                break;

            case 'create_method':
                form = <StepperRestApiMethodForm
                    accountId={this.state.accountId}
                    restApiId={this.state.apiId}
                    resourceId={resource.id}
                />;
                title = 'Create a new method';
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
                <EntriesTree treeEntries={this.buildTree()} handleInitResourceAction={this.handleInitResourceAction}/>
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
            addErrorNotification: (message) => dispatch(addErrorNotification(message))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiResourceDetail);