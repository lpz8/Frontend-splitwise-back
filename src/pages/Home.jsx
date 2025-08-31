import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { computeDebts } from "../utils/debts";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    async function load() {
      const [u, ex] = await Promise.all([apiGet("/users"), apiGet("/expenses")]);
      setUsers(u);
      setDebts(computeDebts(ex));
    }
    load().catch(console.error);
  }, []);

  const nameOf = (id) => users.find(u => String(u._id) === String(id))?.name || "Desconocido";

  return (
    <div className="app">
      <div className="card">
        <h1>Resumen de deudas</h1>
        {debts.length === 0 ? <p>No hay deudas todavía.</p> : (
          <table>
            <thead><tr>
                <th className="th-badge">Quién</th>
                <th className="th-badge">→</th>
                <th className="th-badge">A Quién</th>
                <th className="th-badge amount">€</th>
                </tr>
                </thead>
            <tbody>
              {debts.map((d, i) => (
                <tr key={i}>
                  <td>{nameOf(d.from)}</td>
                  <td>→</td>
                  <td>{nameOf(d.to)}</td>
                  <td>{d.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}