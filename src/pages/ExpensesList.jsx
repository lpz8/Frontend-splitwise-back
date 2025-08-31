import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../api";

export default function ExpensesList() {
  const [list, setList] = useState([]);
  useEffect(() => { apiGet("/expenses").then(setList).catch(console.error); }, []);
  return (
    <div className="card">
      <h2>Gastos</h2>
      <div className="actions">
        <Link className="link-cta" to="/expenses/new">Nuevo Gasto</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th className="amount">Importe</th>
            <th>Pagó</th>
            <th>Fecha</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(e => (
            <tr key={e._id}>
              <td>{e.title}</td>
              <td className="amount">{e.amount} €</td>
              <td>{e.paidBy?.name || "??"}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td><Link to={`/expenses/${e._id}`}>Ver</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}