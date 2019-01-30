import React, { Component } from 'react';
import TreeMethodElement from './TreeMethodElement';
import TreeResourceHeader from './TreeResourceHeader';
import { mapKeys } from 'lodash';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import ResourceActionEnum from '../../enum/resourceActionsEnum';

/**
 *
 */
class TreeResourceElement extends Component
{
    /**
     *
     */
    onCreateResource = () => {
        this.props.handleInitResourceAction(this.props.id, ResourceActionEnum.CREATE_RESOURCE);
    };

    /**
     *
     */
    onDeleteResource = () => {
        this.props.handleInitResourceAction(this.props.id, ResourceActionEnum.DELETE_RESOURCE);
    };

    /**
     *
     * @param httpMethod
     */
    onDeleteHttpMethod = (httpMethod) => {
        this.props.handleInitHttpMethodAction(this.props.id, httpMethod, ResourceActionEnum.DELETE_HTTP_METHOD);
    };

    /**
     *
     */
    onCreateMethod = () => {
        this.props.handleInitResourceAction(this.props.id, ResourceActionEnum.CREATE_HTTP_METHOD);
    };

    /**
     *
     */
    onCreateHttpIntegration = (httpMethod) => {
        this.props.handleInitHttpMethodAction(this.props.id, httpMethod,  ResourceActionEnum.CREATE_HTTP_INTEGRATION);
    };

    /**
     *
     * @param httpMethod
     */
    onCreateHttpResponse = (httpMethod) => {
        this.props.handleInitHttpMethodAction(this.props.id, httpMethod,  ResourceActionEnum.CREATE_HTTP_RESPONSE);
    };

    /**
     *
     * @returns {*}
     */
    renderMethodElements = () => {
        if (!this.props.matchToFilter || this.props.matchToFilter === 'NONE') {
            return null;
        }

        let i = 0;
        let elements = [];
        mapKeys(this.props.resourceMethods, (value, key) => {
            if (this.props.matchToFilter !== 'ALL' && this.props.matchToFilter !== key) {
                return ;
            }

            elements.push(<TreeMethodElement
                type={key}
                key={i++}
                path={this.props.path}
                httpResource={value}
                onDelete={this.onDeleteHttpMethod}
                onCreateHttpIntegration={this.onCreateHttpIntegration}
                onCreateHttpResponse={this.onCreateHttpResponse}
            />);
        });

        return elements;
    };

    /**
     *
     * @param event
     * @param expanded
     */
    handleExpandStateChange = (event, expanded) => {
        this.props.onExpand(this.props.id, expanded);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <ExpansionPanel classes={{expanded: "tree-resource-expanded"}} className="tree-resource-container" defaultExpanded={this.props.expanded} onChange={this.handleExpandStateChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className="tree-resource-header">
                    <TreeResourceHeader
                        path={this.props.path}
                        resourceId={this.props.id}
                        onCreateMethod={this.onCreateMethod}
                        onDeleteResource={this.onDeleteResource}
                        onCreateResource={this.onCreateResource}
                    />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="tree-source-element-details">
                    {this.renderMethodElements()}
                    {this.props.nested}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

TreeResourceElement.propTypes = {
    path: PropTypes.string.isRequired,
    resourceMethods: PropTypes.object.isRequired,
    expanded: PropTypes.bool,
    id: PropTypes.any.isRequired,
    handleInitResourceAction: PropTypes.func.isRequired,
    handleInitHttpMethodAction: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    matchToFilter: PropTypes.string,
};

export default TreeResourceElement;