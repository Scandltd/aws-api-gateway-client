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
     * @param httpMethodNew
     * @param qStringNew
     */
    handleOnFilter = (httpMethodNew, qStringNew) => {
        this.props.setFilterValue(qStringNew, httpMethodNew);
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
                searchBar={ <Tooltip title="To REST APIs">
                    <IconButton aria-label="To REST APIs" onClick={ this.handleRedirectToRestApis } >
                        <BackIcon />
                    </IconButton>
                </Tooltip> }
                actions={
                    <SearchBar onSearch={ this.handleOnFilter } />
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
 * @param filterParams
 */
const getParent = (entries, keyId, exists, filterParams) => {
    const result = {};
    const entity = entries[keyId];

    if (entity) {
        if (!filterParams.qString && has(entity, 'pathPart') ? entity.pathPart.includes(filterParams.qString) : entity.path.includes(filterParams.qString)) {
            if (filterParams.httpMethod) {
                entity.matchToFilter = filterParams.httpMethod;
            } else {
                entity.matchToFilter = 'ALL';
            }
        } else {
            entity.matchToFilter = 'NONE';
        }

        result[entity.id] = entity;

        if (entity.parentId && !has(exists, entity.parentId)) {
            merge(result, getParent(entries, entity.parentId, exists, filterParams));
        }
    }

    return result;
};

/**
 *
 * @param entries
 * @param filterParams
 *
 * @returns {*}
 */
const filteredValues = (entries, filterParams) => {
    const normalizedValues = mapKeys(entries, (value, key) => {
        return value.id;
    });

    const filtered = {};
    map(normalizedValues, (value, key) => {
        if(has(filtered, key)) {                // check for duplicate
            return ;
        }

        if (!value.pathPart || !value.pathPart.includes(filterParams.qString)) {        // filter by query string
            return ;
        }

        if (filterParams.httpMethod) {          //filter by http method
            if (!value.resourceMethods || !has(value.resourceMethods, filterParams.httpMethod)) {
                return ;
            }

            value.matchToFilter = filterParams.httpMethod;
        } else {
            value.matchToFilter = 'ALL';
        }

        filtered[key] = value;
        if (!value.parentId || has(filtered, value.parentId)) {
            return ;
        }

        merge(filtered, getParent(normalizedValues, value.parentId, filtered, filterParams));      // walk on the parent entity
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
const getQString = (state) => state.apiResourceDetail.qString;

/**
 *
 * @param state
 *
 * @returns {*}
 */
const getHttpMethod = (state) => state.apiResourceDetail.httpMethod;

const resourceSelector = createSelector(
    [getResources],
    (entries) => {
        if (!entries || !Array.isArray(entries)) {
            return null;
        }

        return entries;
    });

const treeSelector = createSelector(
    [getResources, getQString, getHttpMethod],
    (entries, qString, httpMethod) => {
        if (!entries || !Array.isArray(entries)) {
            return [];
        }

        const filterParams = {
            qString,
            httpMethod,
        };

        const data = filteredValues(entries, filterParams);

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
