import { useEffect, useState } from "react";
import { apiGet, apiJson } from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function load() {
    const u = await apiGet("/users");
    setUsers(u);
  }

  useEffect(() => {
    load().catch(console.error);
  }, []);

  async function onAdd(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    await apiJson("POST", "/users", { 
      name: name.trim(), 
      email: email.trim() 
    });

    setName(""); 
    setEmail("");
    await load();
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Usuarios</h1>

        <form className="form" onSubmit={onAdd}>
          <label className="label">Nombre</label>
          <input
            className="input"
            placeholder="Ej: Sergio García López"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label className="label" style={{ marginTop: 8 }}>Email</label>
          <input
            className="input"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <button type="submit" className="btn" style={{ marginTop: 12 }}>
            Añadir usuario
          </button>
        </form>

        <ul className="user-list">
          {users.map(u => (
            <li key={u._id} className="user-item">
              <img
                className="avatar"
                src={/(\b(lu|so|ma|pa|la|ro|an|be|ca)\b)/i.test(u.name) 
                  ? "/female.png" 
                  : "/male.png"}
                alt="avatar"
              />
              <div className="user-col">
                <div className="user-name">{u.name}</div>
                <div className="user-email">{u.email}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}