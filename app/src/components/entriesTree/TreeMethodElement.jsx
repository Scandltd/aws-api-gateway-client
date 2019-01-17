import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import HttpMethodEnum from "../../enum/httpMethodTypeEnum";
import AlertDialogComponent from '../dialog/AlertDialogComponent';
import TreeMethodHeader from './TreeMethodHeader';
import TreeMethodDetails from './TreeMethodDetails';

/**
 *
 */
class TreeMethodElement extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            isDeleteDialogOpened: false
        };
    }

    /**
     *
     */
    handleClick = (event) => {
        event.stopPropagation();
        this.setState(function(state, props) {
            return {
                expanded: !state.expanded
            };
        });
    };

    /**
     *
     * @param event
     */
    handleDelete = (event) => {
        this.setState({isDeleteDialogOpened: true});
    };

    /**
     *
     */
    handleDeleteConfirm = () => {
        this.props.onDelete(this.props.type);
        this.setState({isDeleteDialogOpened: false});
    };

    /**
     *
     */
    handleDeleteDismiss = () => {
        this.setState({isDeleteDialogOpened: false});
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const deleteDialog = this.state.isDeleteDialogOpened ?
            <AlertDialogComponent
                title={`You are trying to delete HTTP method ${this.props.type}`}
                description="delete description goes here"
                open={true}
                handleCancel={this.handleDeleteDismiss}
                handleAgree={this.handleDeleteConfirm}
            />
            : null;

        return (
            <div className={`tree-method tree-method-type-${this.props.type}`}>
                <ExpansionPanel expanded={this.state.expanded}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={`tree-method-header tree-method-header-type-${this.props.type}`} onClick={this.handleClick}>
                        <TreeMethodHeader httpMethod={this.props.type} path={this.props.path} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails >
                        { this.state.expanded && <TreeMethodDetails
                            entity={this.props.httpResource}
                            onCreateHttpIntegration={ () => {this.props.onCreateHttpIntegration(this.props.type)} }
                            onCreateHttpResponse={ () => {this.props.onCreateHttpResponse(this.props.type)} }
                        /> }
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        { this.state.expanded &&
                            <Button size="small" color="primary" onClick={this.handleDelete}>
                                Delete
                            </Button>
                        }
                    </ExpansionPanelActions>
                </ExpansionPanel>
                { deleteDialog }
            </div>
        );
    }
}

export default TreeMethodElement;

TreeMethodElement.propTypes = {
    path: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(HttpMethodEnum)).isRequired,
    httpResource: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCreateHttpIntegration: PropTypes.func,
    onCreateHttpResponse: PropTypes.func
};
