import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find, mapKeys, map, has, merge, values } from 'lodash';
import { createSelector } from 'reselect'
import arrayToTree from 'array-to-tree';
import {
    loadResources,
    deleteResourceApiRequest,
    deleteMethodApiRequest,
    loadRestApi
} from '../../store/actions/entriesActions';
import {
    setFilterValue,
    setDefaultState,
} from '../../store/actions/apiResourceDetailActions';
import { addErrorNotification } from '../../store/actions/notificationActions';
import EntriesTree from '../../components/entriesTree/EntriesTree';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';
import RestApiResourceForm from '../form/restApiResource/RestApiResourceForm';
import StepperRestApiMethodForm from '../form/method/StepperRestApiMethodForm';
import ResourceActionEnum from '../../enum/resourceActionsEnum';
import IntegrationForm from '../form/method/IntegrationForm';
import ResponseForm from '../form/method/ResponseForm';
import InnerPageWrapper from '../../components/innerPageWrapper/InnerPageWrapper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BackIcon from '@material-ui/icons/ArrowBack';
import SearchBar from '../../components/searchBar/SearchBar';

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
            activeResourceId: null,
            httpMethod: null,
        };
    }

    /**
     *
     */
    componentDidMount() {
        if (!this.props.entries) {
            this.props.loadResources(this.state.accountId, this.state.apiId);
        }

        this.props.loadRestApi(this.state.accountId, this.state.apiId);
    }

    /**
     *
     */
    componentWillUnmount() {
        this.props.setDefaultState();
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
     */
    flushResourceAction = () => {
        this.setState({
            resourceAction: null,
            activeResourceId: null,
            httpMethod: null
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
                this.props.addErrorNotification('Unknown action');
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
                this.props.deleteMethodApiRequest(this.state.accountId, this.state.apiId, resourceId, httpMethod);
                break;

            case ResourceActionEnum.CREATE_HTTP_INTEGRATION:
            case ResourceActionEnum.CREATE_HTTP_RESPONSE:
                this.setState({
                    resourceAction: action,
                    activeResourceId: resourceId,
                    httpMethod: httpMethod
                });
                break;

            default:
                this.props.addErrorNotification('Unknown action');
                break;
        }
    };

    /**
     *
     * @param resourceId
     */
    deleteResource = (resourceId) => {
        this.props.deleteResourceApiRequest(this.state.accountId, this.state.apiId, resourceId);
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
        return find(this.props.entries, {id: resourceId});
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

            case ResourceActionEnum.CREATE_HTTP_INTEGRATION:
                form = <IntegrationForm
                    accountId={this.state.accountId}
                    restApiId={this.state.apiId}
                    resourceId={this.state.activeResourceId}
                    isUpdateAction={false}
                    httpMethod = {this.state.httpMethod}
                    onCancel={this.flushResourceAction}
                    onSuccess={this.flushResourceAction}

                />;
                title = 'HTTP integration';
                break;

            case ResourceActionEnum.CREATE_HTTP_RESPONSE:
                form = <ResponseForm
                    accountId={this.state.accountId}
                    restApiId={this.state.apiId}
                    resourceId={this.state.activeResourceId}
                    isUpdateAction={false}
                    httpMethod = {this.state.httpMethod}
                    onCancel={this.flushResourceAction}
                    onSuccess={this.flushResourceAction}
                />;
                title = 'HTTP response';
                break;

            default:
                break;
        }

        return (
            <DialogFormComponent open={true} title={title} onClose={this.onCloseDialog}>
                { form }
            </DialogFormComponent>
        );
    };

    /**
     *
     */
    handleRedirectToRestApis = () => {
        this.props.history.push(`/account/${this.props.match.params.accountId}/api`);
    };

    /**
     *
     * @param qStringNew
     */
    handleOnFilter = (qStringNew) => {
        const { qString } = this.props;

        if(qString !== qStringNew) {
            this.props.setFilterValue(qStringNew);
        }
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { restApi, loadingRestApi, entriesTree } = this.props;
        const title = loadingRestApi ? 'loading...' : restApi.name ? restApi.name : '';

        return (
            <InnerPageWrapper
                title={ title }
                searchBar={ <SearchBar onBlur={ this.handleOnFilter } /> }
                actions={
                    <Tooltip title="To REST APIs">
                        <IconButton aria-label="To REST APIs" onClick={ this.handleRedirectToRestApis } >
                            <BackIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <EntriesTree
                    entries={ entriesTree }
                    handleInitResourceAction={ this.handleInitResourceAction }
                    handleInitHttpMethodAction={ this.handleInitHttpMethodAction }
                />
                {this.renderForm()}
            </InnerPageWrapper>
        );
    }
}

/**
 *
 * @param entries
 * @param keyId
 * @param exists
 * @param qString
 */
const getParent = (entries, keyId, exists, qString) => {
    const result = {};
    const entity = entries[keyId];

    if (entity) {
        entity.matchToFilter = has(entity, 'pathPart') ? entity.pathPart.includes(qString) : entity.path.includes(qString) ;
        result[entity.id] = entity;

        if (entity.parentId && !has(exists, entity.parentId)) {
            merge(result, getParent(entries, entity.parentId, exists));
        }
    }

    return result;
};

/**
 *
 * @param entries
 * @param qString
 *
 * @returns {*}
 */
const filteredValues = (entries, qString) => {
    const normalizedValues = mapKeys(entries, (value, key) => {
        return value.id;
    });

    const filtered = {};
    map(normalizedValues, (value, key) => {
        if(value.pathPart && value.pathPart.includes(qString)) {
            if(has(filtered, key)) {
                return ;
            }

            value.matchToFilter = true;

            filtered[key] = value;
            if (value.parentId && !has(filtered, value.parentId)) {
                merge(filtered, getParent(normalizedValues, value.parentId, filtered, qString));
            }
        }
    });

    return values(filtered);
};

/**
 *
 * @param state
 * @param props
 *
 * @returns {*}
 */
const getResources = (state, props) => state.entries.entries[props.match.params.apiId];

/**
 *
 * @param state
 *
 * @returns {string}
 */
const getQString = (state) => state.apiResourceDetailReducer.qString;

const resourceSelector = createSelector(
    [getResources],
    (entries) => {
        if (!entries || !Array.isArray(entries)) {
            return null;
        }

        return entries;
    });

const treeSelector = createSelector(
    [getResources, getQString],
    (entries, qString) => {
        if (!entries || !Array.isArray(entries)) {
            return [];
        }

        const data = qString ? filteredValues(entries, qString) : entries;

        return arrayToTree(data, {
            parentProperty: 'parentId',
            customID: 'id'
        });
    }
);

/**
 *
 * @param state
 * @param props
 *
 * @returns {{entries: any, restApi: ({}|defaultState.restApi), loadingRestApi: boolean}}
 */
const mapStateToProps = (state, props) => {
    return {
        entries: resourceSelector(state, props),
        entriesTree: treeSelector(state, props),
        restApi: state.entries.restApi,
        loadingRestApi: state.entries.loadingRestApi,
        qString: getQString(state),
    }
};

export default connect(mapStateToProps, {
    loadResources,
    deleteResourceApiRequest,
    addErrorNotification,
    deleteMethodApiRequest,
    loadRestApi,
    setFilterValue,
    setDefaultState,
})(ApiResourceDetail);
