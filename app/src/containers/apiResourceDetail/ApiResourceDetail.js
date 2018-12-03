import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadResources, deleteResourceApiRequest } from '../../store/actions/entriesActions';
import EntriesTree from '../../components/entriesTree/EntriesTree';
import arrayToTree from 'array-to-tree';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';

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
            resourceAction: null
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
     * @param resourceId
     * @param action
     */
    handleInitResourceAction = (resourceId, action) => {
        console.log('handle init resource action', resourceId, action);


        if ('delete_resource' === action) {
            this.props.actions.deleteResource(resourceId);
        }



    };

    /**
     *
     * @param resourceId
     */
    deleteResource = (resourceId) => {
        this.props.deleteResource(this.state.accountId, this.state.apiId, resourceId);
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

                <DialogFormComponent open={Boolean(this.state.resourceAction)}>

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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiResourceDetail);