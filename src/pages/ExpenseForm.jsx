import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiJson } from "../api";

export default function ExpenseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "", amount: "", paidBy: "", participants: [], date: "", description: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/users").then(setUsers);
    if (id) apiGet(`/expenses/${id}`).then(e => {
      setForm({
        title: e.title,
        amount: e.amount,
        paidBy: e.paidBy?._id || e.paidBy,
        participants: (e.participants || []).map(p => p._id || p),
        date: e.date?.slice(0,10) || "",
        description: e.description || ""
      });
    });
  }, [id]);

  const updateField = (k, v) => setForm(s => ({ ...s, [k]: v }));
  const toggleParticipant = (uid) => {
    setForm(s => {
      const has = s.participants.includes(uid);
      return { ...s, participants: has ? s.participants.filter(x => x !== uid) : [...s.participants, uid] };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        ...form,
        amount: Number(form.amount),
        date: form.date ? new Date(form.date).toISOString() : undefined
      };
      if (id) await apiJson("PUT", `/expenses/${id}`, payload);
      else await apiJson("POST", "/expenses", payload);
      navigate("/expenses");
    } catch (err) {
      setError("Revisa los datos (faltan campos o formato incorrecto)");
    }
  };

  return (
    <div className="card">
      <h2>{id ? "Editar Gasto" : "Nuevo Gasto"}</h2>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div>
            <label>Título</label>
            <input value={form.title} onChange={e => updateField("title", e.target.value)} />
          </div>
          <div>
            <label>Importe (€)</label>
            <input type="number" step="0.01" value={form.amount} onChange={e => updateField("amount", e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Pagado por</label>
            <select value={form.paidBy} onChange={e => updateField("paidBy", e.target.value)}>
              <option value="">-- elige --</option>
              {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>
          <div>
            <label>Fecha</label>
            <input type="date" value={form.date} onChange={e => updateField("date", e.target.value)} />
          </div>
        </div>
         
         <div>
       <label>Participantes</label>
       <div className="actions">
         {users.map(u => (
           <label key={u._id} className="participant-chip">
             <span>{u.name}</span>
             <input
               type="checkbox"
               checked={form.participants.includes(u._id)}
               onChange={() => toggleParticipant(u._id)}
               />
           </label>
         ))}
       </div>
      </div>
        
         <div>
       <label>Descripción</label>
          <textarea rows="3" value={form.description} onChange={e => updateField("description", e.target.value)} />
        </div>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <div className="actions" style={{ marginTop: 10 }}>
          <button className="btn">{id ? "Guardar Cambios" : "Crear Gastos"}</button>
        </div>
      </form>
    </div>
  );
}