import React, { Component } from 'react';
import { Route } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import ExtensionIcon from '@material-ui/icons/Extension';
import MenuList from '@material-ui/core/MenuList';
import AccountApi from '../accountApi/AccountApi';
import SidebarPage from '../../components/sidebarPage/SidebarPage';
import MenuNavLink from '../../components/sidebar/MenuNavLink';
import ApiDeploy from "../apiDeploy/ApiDeploy";

import './account.scss';

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
            <SidebarPage
                leftContent={
                    <MenuList>
                        <MenuNavLink path={`/account/${this.props.match.params.accountId}/api`} title="API" icon={<ExtensionIcon />} />
                        <MenuNavLink path={`/account/${this.props.match.params.accountId}/settings`} title="Settings" icon={<SettingsIcon />} />
                    </MenuList>
                }
                mainContent={
                    <React.Fragment>
                        <Route path="/account/:accountId/api"  render={(props) => <AccountApi accountId={this.props.match.params.accountId} {...props} /> } />
                        <Route path="/account/:accountId/api/:apiId/deploy" component={ ApiDeploy } />
                        <Route exact path="/account/:accountId/settings" render={() => <h3>settings.</h3>}/>
                    </React.Fragment>
                }
            />
        );
    }
}

export default Account;
