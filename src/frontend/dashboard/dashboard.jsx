import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Carregar os tickets do backend ao carregar a página
    const token = localStorage.getItem('token');
    if (token) {
      loadTickets(token);
    } else {
      navigate('/login')
      console.error('Token não encontrado. Usuário não autenticado.');
    }
  }, []);

  const loadTickets = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/ticket', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets(response.data);
    } catch (error) {
      console.error('Erro ao carregar tickets:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`http://localhost:3000/ticket?q=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Erro ao buscar tickets:', error);
      }
    } else {
      console.error('Token não encontrado. Usuário não autenticado.');
    }
  };

  const handleRespond = (ticketId) => {
    // Implementar redirecionamento usando API do WhatsApp
    console.log('Responder ticket com ID:', ticketId);
  };

  const handleEditStatus = (ticketId) => {
    // Implementar lógica para editar status do ticket
    console.log('Editar status do ticket com ID:', ticketId);
  };

  const handleDeleteTicket = (ticketId) => {
    // Implementar lógica para excluir/inativar ticket
    console.log('Excluir ticket com ID:', ticketId);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-8">
        <h1 className="custom-dashboard-title">Dashboard</h1>
        </div>
        <div className="col-md-4">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Pesquisar tickets"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">Pesquisar</button>
          </form>
        </div>
      </div>

      <div className="row mt-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ticket.nome}</h5>
                <p className="card-text">Produto: {ticket.produto}</p>
                <p className="card-text">Data: {ticket.data}</p>
                <p className="card-text">WhatsApp: {ticket.whatsapp}</p>
                <p className="card-text">Mensagem: {ticket.mensagem}</p>
                <div className="d-flex justify-content-between">
                  <button onClick={() => handleRespond(ticket.id)} className="btn btn-primary">Responder</button>
                  <button onClick={() => handleEditStatus(ticket.id)} className="btn btn-secondary">Editar Status</button>
                  <button onClick={() => handleDeleteTicket(ticket.id)} className="btn btn-danger">Excluir</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
