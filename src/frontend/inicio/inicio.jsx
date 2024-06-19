import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import "./inicio.css";

function Inicio() {

  const navigate = useNavigate();

  const handleCriarTicket = () => {
    navigate('/criar-ticket');
  };

  const handleAdmin = () => {
    navigate('/login');
  };
 
  return (
    <div className="container-fluid bg-dark text-white vh-100 d-flex flex-column align-items-center justify-content-center position-relative">
            <img src="logo.png" alt="Logo" width="150px" className="position-absolute top-0 start-50 translate-middle-x mt-4" />
      <div className="position-absolute top-0 end-0 m-4">
        <button className="btn btn-outline-light" onClick={handleAdmin}>
          <i className="fas fa-user me-2"></i>Admin
        </button>
      </div>
      <div className="text-center">
        <h1 className="display-4 fw-bold">Suporte ao Cliente</h1>
        <h2 className="display-6">Envie um ticket explicando seu problema e produto comprado, <br/> um de nossos atendentes responderá pelo numero de telefone assim que possível!</h2>
        <div className="mt-4">
          <button className="btn btn-custom btn-primary btn-lg me-3" onClick={handleCriarTicket}>Criar Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
