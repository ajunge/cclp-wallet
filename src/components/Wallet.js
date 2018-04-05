import React, { Component } from 'react';
import Transfer from './Transfer'
import {formatcCLP} from '../lib/Numeric'
import {initContract, version, accounts, getWeiBalance, balance} from '../lib/Eth'
import './Wallet.css';

const WEIMAX = 10000000000000000000

export default class Wallet extends Component {
  state = {
    version: '',
    account: '',
    balance: 0,
    cCLP: 0
  }

  componentDidMount() {
    initContract().then(() => {
      version().then(version => this.setState({version}))
      accounts().then(this.setAccounts).then(this.setBalances).catch(console.error)
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
  }

  render() {
    return (
      <div className="Wallet">
        <Battery balance={this.state.balance} version={this.state.version}/>
        <Balance cCLP={this.state.cCLP}/>
        <Address account={this.state.account}/>
        <Transfer address={this.state.account}/>
      </div>
    );
  }
}

const Battery = ({balance, version}) => (
  <div className="Icons">
    <span className="Icon">{version}</span>
    <i className={"fas fa-2x fa-battery-" + batteryLevel(balance / WEIMAX)} />
  </div>
)

const Balance = ({cCLP}) => (
  <div className="Balance">
    <label className="Amount">{formatcCLP(cCLP)}</label>
    <label>cCLP</label>
  </div>
)

const Address = ({account}) => (
  <div className="Address">
    <p>{account}</p>
  </div>
)

function batteryLevel(fuel) {
  let battery = 'full'
  if (fuel < 0.1) {
    battery = 'empty'
  } else if (fuel < 0.3) {
    battery = 'quarter'
  } else if (fuel < 0.5) {
    battery = 'half'
  } else if (fuel < 0.8) {
    battery = 'three-quarter'
  }
  return battery
}
