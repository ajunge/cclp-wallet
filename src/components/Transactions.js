import React, { Component } from 'react';
import './Transactions.css'

const Transactions = () => (
  <div className="Transaction">
    <table>
      <thead className="TableHeader">
        <tr>
          <th>N°</th>
          <th>Direccion Origen</th>
          <th>Direccion Destino</th>
          <th>Monto</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td><td>0x0197a370ec6ffd5b51af45e3fe8541c8b2dc2b74</td><td>0x76a876a87sdf876a87sd8f68a7sd6f78687a6sdf</td><td>1.500</td>
        </tr>
        <tr>
          <td>2</td><td>0x76a876a87sdf876a87sd8f68a7sd6f78687a6sdf</td><td>0x0197a370ec6ffd5b51af45e3fe8541c8b2dc2b74</td><td>1.500</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Transactions
