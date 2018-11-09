import React, { Component } from 'react';
import './App.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AccountLoader from '../services/accounts/AccountLoader';
import AccountContext from '../components/contexts/AccountContext';
import { BrowserRouter} from 'react-router-dom';
import Main from '../components/main/Main';


/**
 * App component
 */
class App extends Component {
  
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
    };
  }

  /**
   * 
   */
  componentDidMount = () => {
    const loader = new AccountLoader();
    this.setState({
      accounts: loader.getAccounts()
    });
  }

  /**
   * 
   */
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AccountContext.Provider value={{accounts: this.state.accounts}}>
            <Header />
            <Main />
            <Footer />
          </AccountContext.Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
