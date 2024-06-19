import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadTickets(token);
    } else {
      navigate('/login');
      console.error('Token não encontrado. Usuário não autenticado.');
    }
  }, [navigate]);

  const loadTickets = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/ticket', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Resposta da API:', response.data);
      const activeTickets = response.data.filter(ticket => ticket.ativo !== 0);
      setTickets(activeTickets);
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
        console.log('Resposta da API (pesquisa):', response.data);
        const activeTickets = response.data.filter(ticket => ticket.ativo !== 0);
        setTickets(activeTickets);
      } catch (error) {
        console.error('Erro ao buscar tickets:', error);
      }
    } else {
      console.error('Token não encontrado. Usuário não autenticado.');
    }
  };

  const handleRespond = (ticket) => {
    const phoneNumber = ticket.whatsapp;
    const message = `Olá, ${ticket.nome}! Recebemos um ticket sobre ${ticket.produto}, por favor nos forneça mais informações sobre o ocorrido.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEditStatus = (id) => {
    console.log('Editar status do ticket com ID:', id);
  };

  const handleDeleteTicket = async (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.patch(`http://localhost:3000/ticket/${id}`, { ativo: 0 }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Atualizar a lista de tickets após a exclusão
        setTickets(tickets.filter(ticket => ticket.idticket !== id));
      } catch (error) {
        console.error('Erro ao excluir ticket:', error);
      }
    } else {
      console.error('Token não encontrado. Usuário não autenticado.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-md-8">
          <h1 className="custom-dashboard-title" style={{ color: '#6E00D8' }}>Dashboard</h1>
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
          <div key={ticket.id} className="col-sm-6 col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{ticket.nome}</h5>
                <p className="card-text">Produto: {ticket.produto}</p>
                <p className="card-text">Data: {new Date(ticket.data).toLocaleDateString()}</p>
                <p className="card-text">WhatsApp: {ticket.whatsapp}</p>
                <p className="card-text">Mensagem: {ticket.mensagem}</p>
                <div className="d-flex justify-content-between">
                  <button onClick={() => handleRespond(ticket)} className="btn btn-primary btn-sm">Responder</button>
                  <button onClick={() => handleEditStatus(ticket.id)} className="btn btn-secondary btn-sm">Editar Status</button>
                  <button onClick={() => handleDeleteTicket(ticket.id)} className="btn btn-danger btn-sm">Excluir</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed-bottom d-flex justify-content-end p-3">
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
