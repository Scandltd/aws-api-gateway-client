import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AlertDialogComponent from '../dialog/AlertDialogComponent';
import Divider from '@material-ui/core/Divider';

/**
 *
 */
class TreeResourceHeader extends Component
{
    state = {
        anchorEl: null,
        isDeleteDialogOpened: false
    };

    /**
     *
     * @param event
     */
    handleClick = event => {
        event.stopPropagation();
        this.setState({ anchorEl: event.currentTarget });
    };

    /**
     *
     * @param event
     */
    handleClose = (event) => {
        event.stopPropagation();
        this.setState({ anchorEl: null });
    };

    /**
     *
     * @param event
     */
    handleCreateResource = (event) => {
        this.handleClose(event);
        this.props.onCreateResource();
    };

    /**
     *
     * @param event
     */
    handleCreateMethod = (event) => {
        this.handleClose(event);
        this.props.onCreateMethod();
    };

    /**
     *
     * @param event
     */
    handleDeleteResource = (event) => {
        this.handleClose(event);
        this.setState({isDeleteDialogOpened: true});
    };

    /**
     *
     */
    handleDeleteDismiss = () => {
        this.setState({isDeleteDialogOpened: false});
    };

    /**
     *
     */
    handleDeleteConfirm = () => {
        this.setState({isDeleteDialogOpened: false});
        this.props.onDeleteResource();
    };

    /**
     *
     */
    handleShowMore = (event) => {
        this.handleClose(event);
        this.props.onMassToggleAction(this.props.resourceId, 'show');
    };

    /**
     *
     */
    handleHideAll = (event) => {
        this.handleClose(event);
        this.props.onMassToggleAction(this.props.resourceId, 'hide');
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { anchorEl } = this.state;

        const deleteDialog = this.state.isDeleteDialogOpened ?
            <AlertDialogComponent
                title={`You are trying to delete resource ${this.props.path}`}
                description="delete description goes here"
                open={true}
                handleCancel={this.handleDeleteDismiss}
                handleAgree={this.handleDeleteConfirm}
            />
            : null;

        return (
            <React.Fragment>
                <Typography className="tree-resource-header-first">{this.props.path}</Typography>
                <div className="tree-resource-action">
                    <div>
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            size="small"
                        >
                            <MoreVertIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={ this.handleCreateResource }>Create new resource</MenuItem>
                            <MenuItem onClick={ this.handleCreateMethod }>Create method</MenuItem>
                            <MenuItem onClick={ this.handleDeleteResource }>Delete resource</MenuItem>
                            <Divider light />
                            <MenuItem onClick={ this.handleShowMore }>Show all</MenuItem>
                            <MenuItem onClick={ this.handleHideAll }>Hide all</MenuItem>
                        </Menu>
                    </div>
                </div>
                { deleteDialog }
            </React.Fragment>
        );
    };
}

export default TreeResourceHeader;

TreeResourceHeader.propTypes = {
    path: PropTypes.string.isRequired,
    resourceId: PropTypes.any.isRequired,
    onCreateMethod: PropTypes.func,
    onDeleteResource: PropTypes.func,
    onCreateResource: PropTypes.func,
    onMassToggleAction: PropTypes.func,
};
