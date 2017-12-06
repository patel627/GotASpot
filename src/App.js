import React, { Component } from 'react';
import Listings from 'Listings.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Got a Spot?</h1>
        </header>
        <Listings/>
      </div>
    );
  }
}

export default App;
