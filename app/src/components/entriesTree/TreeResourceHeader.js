import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

/**
 *
 */
class TreeResourceHeader extends Component
{
    state = {
        anchorEl: null,
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
        this.props.onDeleteResource();
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { anchorEl } = this.state;

        return (
            <React.Fragment>
                <Typography >{this.props.path}</Typography>
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
                            <MenuItem onClick={this.handleCreateResource}>Create new resource</MenuItem>
                            <MenuItem onClick={this.handleCreateMethod}>Create method</MenuItem>
                            <MenuItem onClick={this.handleDeleteResource}>Delete resource</MenuItem>
                        </Menu>
                    </div>
                </div>
            </React.Fragment>
        );
    };
}

export default TreeResourceHeader;

TreeResourceHeader.propTypes = {
    path: PropTypes.string.isRequired,
    resourceId: PropTypes.any.isRequired,
    onCreateMethod:PropTypes.func,
    onDeleteResource:PropTypes.func,
    onCreateResource:PropTypes.func
};
