import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import AlertDialogComponent from '../dialog/AlertDialogComponent';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';

/**
 * 
 */
class ApiItem extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isDeleteDialogOpened: false,
            anchorEl: null,
        };
    }

    /**
     *
     */
    handleResourceBtn = () => {
        this.setState({
            redirect: true
        });
    };

    /**
     *
     */
    handleDeleteBtn = () => {
        this.handleCloseActionMenu();
        this.setState({isDeleteDialogOpened: true});
    };

    /**
     *
     */
    handleDeleteDialogCancel = () => {
        this.setState({isDeleteDialogOpened: false});
    };

    /**
     *
     */
    handleDeleteDialogAgree = () => {
        this.setState({isDeleteDialogOpened: false});
        if (this.props.onDelete) {
            this.props.onDelete(this.props.apiId);
        }
    };

    /**
     *
     */
    handleCloseActionMenu = () => {
        this.setState({ anchorEl: null });
    };

    /**
     *
     */
    handleOpenMenuClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    /**
     *
     */
    handleUpdate = () => {
        this.handleCloseActionMenu();
        if (this.props.onUpdate) {
            this.props.onUpdate(this.props.apiId);
        }
    };

    /**
     *
     * @returns {Array}
     */
    getMenuItems = () => {
        const menuItems = [];
        if (this.props.onDelete) {
            menuItems.push(
                <MenuItem onClick={this.handleDeleteBtn} key={`${this.props.apiId}_delete`}>Delete</MenuItem>
            );
        }

        if (this.props.onUpdate) {
            menuItems.push(
                <MenuItem onClick={this.handleUpdate} key={`${this.props.apiId}_update`}>Update</MenuItem>
            );
        }

        return menuItems;
    };

    /**
     *
     * @returns {string}
     */
    getActionMenu = () => {
        const menuItems = this.getMenuItems();
        let actionMenu = '';
        if (0 !== menuItems.length) {
            actionMenu = (
                <Menu
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleCloseActionMenu}
                    id={`action-menu-${this.props.apiId}`}
                    anchorEl={this.state.anchorEl}
                >
                    { menuItems }
                </Menu>
            );
        }

        return actionMenu;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/account/${this.props.accountId}/api/${this.props.apiId}/resource`} />;
        }

        const deleteDialog = this.props.onDelete ?
                <AlertDialogComponent
                    title={`You are trying to delete REST API: ${this.props.name}`}
                    description="delete description goes here"
                    open={this.state.isDeleteDialogOpened}
                    handleCancel={this.handleDeleteDialogCancel}
                    handleAgree={this.handleDeleteDialogAgree}
                />
            : null;

        const actionMenu = this.getActionMenu();

        return (
            <Grid item sm={6} md={4} lg={4}>
                <Card>
                    <CardHeader
                        action={ actionMenu ?
                            <IconButton onClick={this.handleOpenMenuClick}>
                                <MoreVertIcon />
                            </IconButton>
                            : null
                        }
                        title={this.props.name}
                    />
                    <CardContent>
                        <Typography>
                            {this.props.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleResourceBtn}>
                            Resources
                        </Button>
                        { this.getActionMenu() }
                    </CardActions>
                </Card>
                { actionMenu }
                { deleteDialog }
            </Grid>
        );
    }
}

export default ApiItem;

ApiItem.propTypes = {
    accountId: PropTypes.any.isRequired,
    apiId: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func
};
