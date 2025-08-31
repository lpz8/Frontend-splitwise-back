export default function Readme() {
  return (
    <div className="card">
      <h2>README (Frontend)</h2>
      <p>Proyecto de gestión de gastos tipo Splitwise. Hecho con React + Vite.</p>

      <h3>Cómo arrancar local</h3>
      <pre>
        npm install{'\n'}
        npm run dev
      </pre>

      <h3>Variable de entorno</h3>
      <pre>VITE_BACKEND_URL = https://http://localhost:3000_RENDER.onrender.com</pre>

      <h3>Rutas principales</h3>
      <ul>
        <li>/ — Resumen de deudas</li>
        <li>/expenses — Lista de gastos</li>
        <li>/expenses/new — Crear gasto</li>
        <li>/users — Gestión de usuarios</li>
      </ul>

      <h3>Repos</h3>
      <p>
        Backend: <a href="https://github.com/lpz8/splitwise-back" target="_blank">splitwise-back</a><br/>
        Frontend: <a href="https://github.com/lpz8/splitwise-front" target="_blank">splitwise-front</a>
      </p>
    </div>
  );
}