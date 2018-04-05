import React, { Component } from 'react';
import {isAddress, isAllowed, transfer} from '../lib/Eth'
import './Transfer.css'

const Errors = {
  general: '',
  amount: '',
  address: ''
}

export default class Transfer extends Component {
  state = {
    amount: '',
    address: '',
    success: false,
    errors: {...Errors},
    loading: false
  }

  clearErrors() {
    this.setState({
      errors: {...Errors}
    })
  }

  onAmountChange = (e) => {
    let amount = e.target.value
    let error = ''
    if (isNaN(amount)) {
      error = 'El mónto debe ser numerico'
    }
    this.setState({amount, errors: {...this.state.errors, amount: error}})
  }

  onAddressChange = (e) => {
    this.setState({address: e.target.value})
  }

  submit = (e) => {
    e.preventDefault()
    this.clearErrors()
    let {amount, address} = this.state

    if (isNaN(amount)) {
      this.setState({errors: {...this.state.errors, general: 'El mónto es requerido'}})
      return
    }
    if (!isAddress(address)) {
      this.setState({errors: {...this.state.errors, general: 'La dirección no es válida'}})
      return
    }
    this.setState({loading: true})
    isAllowed(address)
      .then(a => a ? Promise.resolve() : Promise.reject('Direccion no permitida'))
      .then(this.doTransfer)
      .then(this.transferSuccess)
      .catch(this.onError)
  }

  doTransfer = () => {
    let amount = parseInt(this.state.amount, 10)
    let to = this.state.address
    console.log('submit', to, amount)
    return transfer(this.props.address, to, amount)
  }

  transferSuccess = (result) => {
    console.log(result)
    this.setState({loading: false, success: true})
  }

  onError = (e) => {
    this.setState({loading: false, errors: {...this.state.errors, general: e.message ? e.message : e}})
  }

  render() {
    let errors = this.state.errors
    return (
      <div className="Transfer">
        <form className="pure-form" onSubmit={this.submit}>
          <div>
            <input placeholder="Monto" className="pure-input-1" value={this.state.amount} onChange={this.onAmountChange} required/>
            <span className={"RequiredMessage" + (errors.amount !== '' ? ' Error' : '')}>
              *{amountMessage(errors.amount)}.
            </span>
          </div>
          <div>
            <input placeholder="Direccion" className="pure-input-1" value={this.state.address} onChange={this.onAddressChange} required/>
            <span className={"RequiredMessage" + (errors.address !== '' ? ' Error' : '')}>
              *{addressMessage(errors.address)}.
            </span>
          </div>
          <div className="ErrorMessage">{errors.general}</div>
          <div className="SuccessMessage" onClick={() => this.setState({success: false})}>{this.state.success ? 'Transacción ejecutada' : ''}</div>
          <button className="Send pure-button pure-input-1 pure-button-primary" disabled={this.state.loading}>
            {this.state.loading ? <i className="fas fa-circle-notch fa-spin"/> : 'Enviar'}
          </button>
        </form>
      </div>
    );
  }
}

function amountMessage(msg) {
  return msg !== '' ? msg : 'Mónto en cCLP a transferir'
}

function addressMessage(msg) {
  return msg !== '' ? msg : 'Dirección ethereum destino'
}
