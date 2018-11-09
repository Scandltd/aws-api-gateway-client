import React, {Component} from 'react';
import { Switch, Route } from 'react-router'
import MainContainer  from '../../containers/main/MainContainer';
import NoMatchRoute from '../../containers/noMatchRoute/NoMatchRoute';
import ApiDetail from '../../containers/apiDetail/ApiDetail';

/**
 * 
 */
class Main extends Component
{
    render() {
        return (
            <div className="container main-container">
                <Switch>
                    <Route exact path="/" component={MainContainer} />
                    <Route exact path="/:accountId/api/:apiId" component={ApiDetail} />
                    <Route component={NoMatchRoute}/>
                </Switch>  
            </div>  
        );
    }
}

export default Main;