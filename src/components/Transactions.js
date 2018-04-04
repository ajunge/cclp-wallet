import React from 'react';
import './Transactions.css'

const Transactions = () => (
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
        <tr>
          <td>1</td><td>04/04/2012 13:24:34</td><td>0x76a876a87sdf876a87sd8f68a7sd6f78687a6sdf</td><td><i className="fas fa-minus Minus"/></td><td>1.500</td>
        </tr>
        <tr>
          <td>2</td><td>01/02/2019 04:57:01</td><td>0x0197a370ec6ffd5b51af45e3fe8541c8b2dc2b74</td><td><i className="fas fa-plus Plus"/></td><td>1.500</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Transactions
