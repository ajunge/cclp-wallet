import React, { Component } from 'react';
import {initContract, version, accounts, filterTransactions, getWeiBalance,
  balance, getBlock} from './lib/Eth'
import Wallet from './components/Wallet'
import Transaction from './components/Transactions'
import './App.css';

class App extends Component {
  state = {
    version: '',
    account: '',
    balance: 0,
    cCLP: 0,
    transactions: []
  }

  componentDidMount() {
    initContract().then(() => {
      version().then(version => this.setState({version}))
      accounts()
        .then(this.setAccounts)
        .then(this.setBalances)
        .then(this.getTransactions)
        .catch(console.error)
    })
  }

  setAccounts = (accounts) => {
    let account = accounts[0]
    if (!account) return Promise.reject('No hay cuenta')
    this.setState({account: account})
    return account
  }

  setBalances = (account) => {
    getWeiBalance(account).then(balance => this.setState({balance}))
    balance(account).then(cCLP => this.setState({cCLP}))
    return account
  }

  getTransactions = (address) => {
    filterTransactions(address).then(events => {
      let transactions = events.filter(e => e.returnValues._from === address || e.returnValues._to === address).map(e => ({
        from: e.returnValues._from,
        to: e.returnValues._to,
        value: e.returnValues._value,
        block: e.blockNumber,
        hash: e.transactionHash
      }))

      let promises = []
      for (let i = 0; i < transactions.length; i++) {
        let block = transactions[i].block
        promises.push(getBlock(block).then(t => ({block, value: new Date(t.timestamp * 1000).toISOString()})))
      }

      return Promise.all(promises).then(dates => {
        this.setState({transactions: transactions.map(t => ({
          ...t,
          date: dates.find(d => d.block === t.block)
        }))})
      })

    }).catch(console.error)
  }

  render() {
    let {version, account, balance, cCLP, transactions} = this.state
    return (
      <div className="App">
        <div className="Main">
          <Wallet version={version} account={account} balance={balance} cCLP={cCLP}/>
          <Transaction transactions={transactions} account={account}/>
        </div>
      </div>
    );
  }
}

export default App;
