import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet, apiJson } from "../api";

export default function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exp, setExp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/expenses/${id}`)
      .then(setExp)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  async function onDelete() {
    if (!confirm("¿Borrar este gasto?")) return;
    await apiJson("DELETE", `/expenses/${id}`);
    navigate("/expenses");
  }

  if (loading) return <div className="card">Cargando…</div>;
  if (!exp) return <div className="card">No se encontró el gasto.</div>;

  return (
    <div className="app">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{exp.title}</h2>
        <p><b>Importe:</b> {exp.amount} €</p>
        <p><b>Pagó:</b> {exp.paidBy?.name || "—"}</p>
        {exp.date && <p><b>Fecha:</b> {new Date(exp.date).toLocaleDateString()}</p>}
        {exp.description && <p><b>Descripción:</b> {exp.description}</p>}
        <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
          <Link className="btn" to={`/expenses/${id}/edit`}>Editar</Link>
          <button
            className="btn"
            style={{ background: "#e35151", borderColor: "#ff8a8a" }}
            onClick={onDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}