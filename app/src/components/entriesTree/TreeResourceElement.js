import React, { Component } from 'react';
import TreeMethodElement from './TreeMethodElement';
import { mapKeys } from 'lodash';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

/**
 *
 */
class TreeResourceElement extends Component
{
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
            <ExpansionPanel classes={{expanded: "tree-resource-expanded"}} defaultExpanded={this.props.expanded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className="tree-resource-header">
                    <Typography >{this.props.path}</Typography>
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
    id: PropTypes.any.isRequired
};

export default TreeResourceElement;