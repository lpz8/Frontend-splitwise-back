import { useEffect, useState } from "react";
import { apiGet, apiJson } from "../api";

export default function Users() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const load = () => apiGet("/users").then(setList).catch(console.error);
  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    await apiJson("POST", "/users", form);
    setForm({ name: "", email: "" });
    load();
  };

  return (
    <div className="card">
      <h2>Usuarios</h2>
      <form className="row" onSubmit={onSubmit}>
        <input placeholder="Nombre" value={form.name} onChange={e => setForm(s => ({...s, name: e.target.value}))}/>
        <input placeholder="Email" value={form.email} onChange={e => setForm(s => ({...s, email: e.target.value}))}/>
        <button className="btn" type="submit">Añadir</button>
      </form>

      <table>
        <thead><tr><th>Nombre</th><th>Email</th></tr></thead>
        <tbody>
          {list.map(u => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}