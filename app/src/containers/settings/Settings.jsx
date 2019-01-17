import React, { Component } from 'react';
import SidebarPage from '../../components/sidebarPage/SidebarPage';
import MenuList from '@material-ui/core/MenuList';
import MenuNavLink from '../../components/sidebar/MenuNavLink';
import { Route } from "react-router-dom";
import SettingsAccounts from '../settingsAccounts/SettingsAccounts';
import SettingsAccountEdit from '../settingsAccounts/SettingsAccountEdit';
import SettingsAccountNew from '../settingsAccounts/SettingsAccountNew';

class Settings extends Component {
  render() {
    return (
        <SidebarPage
          leftContent={
              <MenuList>
                  <MenuNavLink path={'/settings/account'} title="Accounts" />
              </MenuList>
          }
          mainContent={
              <React.Fragment>
                  <Route exact path="/settings/account" component={ SettingsAccounts } />
                  <Route exact path="/settings/account/:id/edit" component={ SettingsAccountEdit } />
                  <Route exact path="/settings/account/new" component={ SettingsAccountNew } />
              </React.Fragment>
          }
        />
    )
  }
}

export default Settings;

Settings.propTypes = {};