import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      console.log('Token JWT:', token);
      localStorage.setItem('token', response.data.token);

      // Limpa o formulário após o login
      setEmail('');
      setPassword('');
      setError('');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data?.message || error.message);
      setError('Credenciais inválidas. Verifique seu email e senha.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-dark text-white">
      <div className="card p-4 shadow custom-login-container">
        <h1 className="text-center mb-4">Login</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button type="button" onClick={handleBack} className="btn btn-secondary">Voltar</button>
            <button type="submit" className="btn btn-primary me-2">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
