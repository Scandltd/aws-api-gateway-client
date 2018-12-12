import React, { Component } from 'react';
import './account.scss';

import SettingsIcon from '@material-ui/icons/Settings';
import ExtensionIcon from '@material-ui/icons/Extension';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import AccountApi from '../accountApi/AccountApi';
import { Route } from "react-router-dom";
import MenuNavLink from '../../components/sidebar/MenuNavLink';

/**
 *
 */
class Account extends Component
{
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
                            <MenuNavLink path={`/account/${this.props.match.params.accountId}/api`} title="API" icon={<ExtensionIcon />} />
                            <MenuNavLink path={`/account/${this.props.match.params.accountId}/settings`} title="Settings" icon={<SettingsIcon />} />
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
