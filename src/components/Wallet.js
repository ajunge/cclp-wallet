import React from 'react';
import Transfer from './Transfer'
import {formatcCLP} from '../lib/Numeric'
import './Wallet.css';

export default ({version, balance, account, cCLP}) => (
  <div className="Wallet">
    <Battery balance={balance} version={version}/>
    <Balance cCLP={cCLP}/>
    <Address account={account}/>
    <Transfer address={account}/>
  </div>
)

const WEIMAX = 10000000000000000000

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
