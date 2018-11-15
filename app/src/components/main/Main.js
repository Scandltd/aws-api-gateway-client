import React, {Component} from 'react';
import { Switch, Route } from 'react-router'
import MainContainer  from '../../containers/main/MainContainer';
import NoMatchRoute from '../../containers/noMatchRoute/NoMatchRoute';
import ApiDetail from '../../containers/apiDetail/ApiDetail';
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
                    <Route exact path="/:accountId/api/:apiId" component={ApiDetail} />
                    <Route component={NoMatchRoute}/>
                </Switch>  
            </main>
        );
    }
}

export default Main;