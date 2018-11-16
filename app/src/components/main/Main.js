import React, {Component} from 'react';
import { Switch, Route } from 'react-router'
import MainContainer  from '../../containers/main/MainContainer';
import NoMatchRoute from '../../containers/noMatchRoute/NoMatchRoute';
import ApiResourceDetail from '../../containers/apiResourceDetail/ApiResourceDetail';
import Account from '../../containers/account/Account';
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
                    <Route exact path="/account/:accountId/api/:apiId/resource" component={ApiResourceDetail} />
                    <Route path="/account/:accountId" component={Account} />
                    <Route component={NoMatchRoute}/>
                </Switch>  
            </main>
        );
    }
}

export default Main;