import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet, apiJson } from "../api";

export default function ExpenseDetail() {
  const { id } = useParams();
  const [exp, setExp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { apiGet(`/expenses/${id}`).then(setExp).catch(console.error); }, [id]);

  const onDelete = async () => {
    if (!confirm("¿Borrar este gasto?")) return;
    await apiJson("DELETE", `/expenses/${id}`);
    navigate("/expenses");
  };

  if (!exp) return <div className="card">Cargando…</div>;

  return (
    <div className="card">
      <h2>{exp.title}</h2>
      <p><b>Importe:</b> {exp.amount} €</p>
      <p><b>Pagó:</b> {exp.paidBy?.name}</p>
      <p><b>Participantes:</b> {exp.participants?.map(p => p.name).join(", ")}</p>
      <p><b>Fecha:</b> {new Date(exp.date).toLocaleString()}</p>
      {exp.description && <p><b>Notas:</b> {exp.description}</p>}
      <div className="actions">
        <Link className="btn" to={`/expenses/${id}/edit`}>Editar</Link>
        <button className="btn-danger" onClick={onDelete}>Borrar</button>
        <Link className="btn-ghost" to="/expenses">Volver</Link>
      </div>
    </div>
  );
}