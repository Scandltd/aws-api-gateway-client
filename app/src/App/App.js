import React, { Component } from 'react';
import './App.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

/**
 * App component
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container main-container">
          main content iodidoidoid
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
