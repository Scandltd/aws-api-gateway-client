import React, { Component } from 'react';
import './App.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AccountLoader from '../services/accounts/AccountLoader';
import MainScreen from '../screens/main/MainScreen';
import AccountContext from '../components/contexts/AccountContext';

/**
 * App component
 */
class App extends Component {
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

  render() {
    return (
      <div className="App">
        <AccountContext.Provider value={{accounts: this.state.accounts}}>
          <Header />
          <div className="container main-container">
            <MainScreen />
          </div>
          <Footer />
        </AccountContext.Provider>
      </div>
    );
  }
}

export default App;
