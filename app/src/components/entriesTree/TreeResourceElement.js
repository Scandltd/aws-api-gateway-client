import React, { Component } from 'react';
import TreeMethodElement from './TreeMethodElement';
import TreeResourceHeader from './TreeResourceHeader';
import { mapKeys } from 'lodash';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

/**
 *
 */
class TreeResourceElement extends Component
{
    /**
     *
     */
    onCreateResource = () => {
        this.props.handleInitResourceAction(this.props.id, 'create_resource');
    };

    /**
     *
     */
    onDeleteResource = () => {
        //@todo add confirmation dialog
        this.props.handleInitResourceAction(this.props.id, 'delete_resource');
    };

    /**
     *
     */
    onCreateMethod = () => {
        this.props.handleInitResourceAction(this.props.id, 'create_method');
    };

    /**
     *
     * @returns {*}
     */
    renderMethodElements = () => {
        let i = 0;
        let elements = [];
        mapKeys(this.props.resourceMethods, (value, key) => {
            elements.push(<TreeMethodElement type={key} key={i++} path={this.props.path}/>);
        });

        return elements;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <ExpansionPanel classes={{expanded: "tree-resource-expanded"}} className="tree-resource-container" defaultExpanded={this.props.expanded}>
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
};

export default TreeResourceElement;