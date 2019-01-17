import React, { Component } from 'react';
import './account.scss';
import SidebarPage from '../../components/sidebarPage/SidebarPage';
import SettingsIcon from '@material-ui/icons/Settings';
import ExtensionIcon from '@material-ui/icons/Extension';
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
            <SidebarPage
                leftContent={
                    <MenuList>
                        <MenuNavLink path={`/account/${this.props.match.params.accountId}/api`} title="API" icon={<ExtensionIcon />} />
                        <MenuNavLink path={`/account/${this.props.match.params.accountId}/settings`} title="Settings" icon={<SettingsIcon />} />
                    </MenuList>
                }
                mainContent={
                    <React.Fragment>
                        <Route exact path="/account/:accountId/api"  render={() => <AccountApi accountId={this.props.match.params.accountId}/> } />
                        <Route exact path="/account/:accountId/settings" render={() => <h3>settings.</h3>}/>
                    </React.Fragment>
                }
            />
        );
    }
}

export default Account;
