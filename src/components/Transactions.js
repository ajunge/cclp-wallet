import React, {Component} from 'react';
import moment from '../lib/Moment'
import './Transactions.css'

const MINUS = "fas fa-minus Minus"
const PLUS = "fas fa-plus Plus"

export default class Transactions extends Component {
  render() {
    let {account, transactions} = this.props
    return (
      <div className="Transaction">
        <table className="Table">
          <thead className="TableHeader">
            <tr>
              <th>N°</th>
              <th>Fecha</th>
              <th>Direccion</th>
              <th></th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{moment(t.date.value).format('DD/MM/YYYY hh:mm:ss')}</td>
                <td>{t.from === account ? t.to : t.from}</td>
                <td><i className={t.from === account ? MINUS : PLUS}/></td>
                <td>{t.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
