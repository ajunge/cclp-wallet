import React, { Component } from 'react';
import Wallet from './components/Wallet'
import Transaction from './components/Transactions'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Wallet />
          <Transaction />
      </div>
    );
  }
}

export default App;
