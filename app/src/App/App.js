import React, { Component } from 'react';
import './App.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { BrowserRouter} from 'react-router-dom';
import Main from '../components/main/Main';

/**
 * App component
 */
class App extends Component {
  /**
   * 
   */
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Header />
            <Main />
            <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
