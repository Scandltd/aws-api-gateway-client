import React, {Component} from 'react';
import { Switch, Route } from 'react-router'
import MainContainer  from '../../containers/main/MainContainer';
import NoMatchRoute from '../../containers/noMatchRoute/NoMatchRoute';
import ApiResourceDetail from '../../containers/apiResourceDetail/ApiResourceDetail';
import Stages from '../../containers/stages/Stages';
import Account from '../../containers/account/Account';
import Settings from '../../containers/settings/Settings';
import StageDetail from '../../containers/stages/StageDetail';
import './main.scss';

/**
 * 
 */
class Main extends Component
{
    render() {
        return (
            <main className="main-container">
                <Switch>
                    <Route exact path="/" component={MainContainer} />
                    <Route exact path="/account/:accountId/api/:apiId/resource" component={ ApiResourceDetail } />
                    <Route exact path="/account/:accountId/api/:apiId/stage" component={ Stages } />
                    <Route exact path="/account/:accountId/api/:apiId/stage/:stageName/details" component={ StageDetail } />
                    <Route path="/account/:accountId" component={ Account } />
                    <Route path="/settings" component={ Settings } />
                    <Route component={NoMatchRoute} />
                </Switch>
            </main>
        );
    }
}

export default Main;