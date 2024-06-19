import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './frontend/inicio/inicio.jsx';
import CriarTicket from './frontend/ticket/criarticket.jsx';
import Login from './frontend/login/login.jsx'
import Dashboard from './frontend/dashboard/dashboard.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route path="/criar-ticket" element={<CriarTicket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
