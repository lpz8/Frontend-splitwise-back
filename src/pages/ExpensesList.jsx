import { useEffect, useState } from "react";
import { apiGet } from "../api";

export default function ExpensesList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const ex = await apiGet("/expenses");
      setItems(ex);
    }
    load().catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h1>Gastos</h1>

        {items.length === 0 ? (
          <p>No hay gastos todavía.</p>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Título</th>
                <th className="col-amount">Importe</th>
                <th>Pagó</th>
                <th className="col-date">Fecha</th>
                <th className="col-view"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e._id}>
                  <td>{e.title}</td>
                  <td className="col-amount">{e.amount.toFixed(2)} €</td>
                  <td>
                    <img
                      className="avatar"
                      src={
                        /a$/i.test(e.paidBy?.name || "")
                          ? "/female.png"
                          : "/male.png"
                      }
                      alt="avatar"
                    />
                    {e.paidBy?.name}
                  </td>
                  <td className="col-date">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <td className="col-view">
                    <a className="btn btn-link" href={`/expenses/${e._id}`}>
                      Ver
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}