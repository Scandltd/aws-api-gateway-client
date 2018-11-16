import React, { Component } from 'react';
import './account.scss';

import SettingsIcon from '@material-ui/icons/Settings';
import ExtensionIcon from '@material-ui/icons/Extension';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import AccountApi from '../accountApi/AccountApi';
import { Route } from "react-router-dom";

/**
 *
 */
class Account extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {

        };

        console.log(this.props);
    }

    /**
     *
     * @param event
     * @param value
     */
    handleChange = (event, value) => {
        this.setState({ value });
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="account-container">
                <Grid container spacing={24} className="account-grid">
                    <Grid item xs={12} md={2}>
                        <MenuList>
                            <NavLink to={`/account/${this.props.match.params.accountId}/api`} exact activeClassName="active-menu-item">
                                <MenuItem>
                                    <ListItemIcon>
                                        <ExtensionIcon />
                                    </ListItemIcon>
                                    <ListItemText  inset primary="API" />
                                </MenuItem>
                            </NavLink>
                            <NavLink to={`/account/${this.props.match.params.accountId}/settings`} exact activeClassName="active-menu-item">
                                <MenuItem >
                                    <ListItemIcon >
                                        <SettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText  inset primary="Settings" />
                                </MenuItem>
                            </NavLink>
                        </MenuList>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Paper className="account-grid-content">
                            <Route exact path="/account/:accountId/api"  render={() => <AccountApi accountId={this.props.match.params.accountId}/> } />
                            <Route exact path="/account/:accountId/settings" render={() => <h3>settings.</h3>}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Account;
