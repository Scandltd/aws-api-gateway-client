import React, {Component} from 'react';
import './MainScreen.scss';
import AccountItem from './parts/AccountItem';
import AccountContext from '../../components/contexts/AccountContext';

/**
 * 
 */
class MainScreen extends Component
{
    static contextType = AccountContext;

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };    
    }

    /**
     * 
     */
    render() {
        let items = this.context.accounts.map((item, idx) => {
            return <AccountItem title={item.name} id={item.id} key={item.id}/>;
        });

        return (
            <div className="main-page">
                {items}
            </div>
          );
    }
}

export default MainScreen;