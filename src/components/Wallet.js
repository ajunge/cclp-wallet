import React, { Component } from 'react';
import './Wallet.css';

class Wallet extends Component {
  render() {
    return (
      <div className="Wallet">
        <div className="Icons">
          <span className="Icon">Testnet</span>
          <i className="fas fa-battery-half fa-2x" />
        </div>
        <div className="Balance">
          <label className="Amount">0</label>
          <label>cCLP</label>
        </div>
        <div className="Address">
          <p>0x0197a370ec6ffd5b51af45e3fe8541c8b2dc2b74</p>
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

export default Wallet;
