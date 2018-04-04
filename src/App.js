import React, { Component } from 'react';
import Wallet from './components/Wallet'
import Transaction from './components/Transactions'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Main">
          <Wallet />
          <Transaction />
        </div>
      </div>
    );
  }
}

export default App;
