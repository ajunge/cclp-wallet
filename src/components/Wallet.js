import React, { Component } from 'react';
import './Wallet.css';
import {version, accounts, getBalance} from '../lib/Eth'

const WEIMAX = 10000000000000000000

class Wallet extends Component {
  state = {
    version: '',
    account: '',
    balance: 0
  }

  componentDidMount() {
    version().then(version => this.setState({version}))
    accounts().then(accounts => {
      let account = accounts[0]
      this.setState({account: account})
      return account
    }).then(account => {
      getBalance(account).then(balance => this.setState({balance}))
    })
  }

  render() {
    let battery = batteryLevel(this.state.balance / WEIMAX)

    return (
      <div className="Wallet">
        <div className="Icons">
          <span className="Icon">{this.state.version}</span>
          <i className={"fas fa-2x fa-battery-" + battery} />
        </div>
        <div className="Balance">
          <label className="Amount">0</label>
          <label>cCLP</label>
        </div>
        <div className="Address">
          <p>{this.state.account}</p>
        </div>
        <div className="Transfer">
          <form className="pure-form">
            <input placeholder="Direccion" className="pure-input-1"/>
            <button className="Send pure-button pure-input-1 pure-button-primary">Enviar</button>
          </form>
        </div>
      </div>
    );
  }
}

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

export default Wallet;
