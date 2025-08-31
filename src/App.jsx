import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ExpensesList from "./pages/ExpensesList.jsx";
import ExpenseDetail from "./pages/ExpenseDetail.jsx";
import ExpenseForm from "./pages/ExpenseForm.jsx";
import Users from "./pages/Users.jsx";
import Readme from "./pages/Readme.jsx";
import "./App.css";

export default function App(){
  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " is-active" : "");

  return (
  <div className="app">
    <div className="brand-badge" title="THE BRIDGE">
      <img src="/bridge.png" alt="The Bridge" />
    </div>

    <nav className="nav">
      <NavLink to="/" className={linkClass}>Inicio</NavLink>
      <NavLink to="/expenses" className={linkClass}>Gastos</NavLink>
      <NavLink to="/expenses/new" className={linkClass}>Nuevo Gasto</NavLink>
      <NavLink to="/users" className={linkClass}>Usuarios</NavLink>
    </nav>

    <div className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<ExpensesList />} />
        <Route path="/expenses/new" element={<ExpenseForm />} />
        <Route path="/expenses/:id" element={<ExpenseDetail />} />
        <Route path="/expenses/:id/edit" element={<ExpenseForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/readme" element={<Readme />} />
      </Routes>
    </div>

    <div style={{position:"fixed", right:14, bottom:12, display:"flex", gap:8, zIndex:10}}>
    <div className="footer-wrap">
        <a className="footer-link" href="https://github.com/lpz8/Backend-splitwise-back/blob/main/README.md" target="_blank">by: lpz8</a>
        <a className="footer-ball" href="https://github.com/lpz8/Frontend-splitwise-back/blob/main/README.md" target="_blank">⚽️</a>
    </div>
    </div>
  </div>
);
}