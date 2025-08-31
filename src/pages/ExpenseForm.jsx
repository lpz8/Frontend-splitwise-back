import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiJson } from "../api";

export default function ExpenseForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      const u = await apiGet("/users");
      setUsers(u);
      if (id) {
        const exp = await apiGet(`/expenses/${id}`);
        setTitle(exp.title ?? "");
        setAmount(String(exp.amount ?? ""));
        setPaidBy(exp.paidBy?._id ?? "");
        setParticipants((exp.participants || []).map(p => p._id));
        setDate(exp.date ? exp.date.slice(0, 10) : "");
        setDescription(exp.description ?? "");
      }
    })().catch(console.error);
  }, [id]);

  function toggleParticipant(uid) {
    setParticipants(prev =>
      prev.includes(uid) ? prev.filter(x => x !== uid) : [...prev, uid]
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      amount: Number(amount),
      paidBy,
      participants,
      date: date || undefined,
      description: description.trim(),
    };
    if (!payload.title || !payload.amount || !payload.paidBy || !payload.participants.length) {
      alert("Faltan datos obligatorios");
      return;
    }
    if (id) {
      await apijson("PUT", `/expenses/${id}`, payload);
    } else {
      await apijson("POST", "/expenses", payload);
    }
    navigate("/expenses");
  }

  const avatarSrc = (nameStr = "") =>
    /a$|e$|i$|o$|u$|as$|ia$|na$|la$|ra$|ía$|ara$/i.test(nameStr.trim())
      ? "/female.png"
      : "/male.png";

  return (
    <div className="app">
      <div className="card">
        <h1>{id ? "Editar Gasto" : "Nuevo Gasto"}</h1>

        <form className="form" onSubmit={onSubmit}>
          <input
            className="input"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input"
            placeholder="Importe (€)"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginTop: 10 }}
          />

          <select
            className="input"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            style={{ marginTop: 10 }}
          >
            <option value="">— elige quién pagó —</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>

          <div style={{ marginTop: 14, marginBottom: 6, color: "var(--text)", fontWeight: 600 }}>
            Usuarios:
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {users.map(u => (
              <label key={u._id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={participants.includes(u._id)}
                  onChange={() => toggleParticipant(u._id)}
                />
                <img src={avatarSrc(u.name)} alt="" className="avatar" />
                <span>{u.name}</span>
              </label>
            ))}
          </div>

          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ marginTop: 12 }}
          />

          <textarea
            className="input"
            placeholder="Descripción"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginTop: 10 }}
          />

          <button type="submit" className="btn" style={{ marginTop: 12 }}>
            {id ? "Guardar cambios" : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}