import connection from './db.js';
import {update, deleteTick} from './model.js'
import jwt from 'jsonwebtoken';
import { findUserByEmailAndPassword } from './userService.js';

export const getAllTicket = (req, res) => {
  connection.query('SELECT * FROM ticket', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(results);
  });
};

export const createTicket = (req, res) => {
  const { nome, produto, data, whatsapp, mensagem } = req.body;
  const query = 'INSERT INTO ticket (nome, produto, data, whatsapp, mensagem, ativo, status) VALUES (?, ?, ?, ?, ?, 1, 1)';
  connection.query(query, [nome, produto, data, whatsapp, mensagem ], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(201).json({ message: 'Ticket criado com sucesso!' });
  });
};

export async function updateTicket(req, res){
  const { id } = req.params;
  const novoDados = req.body;
  update(id, novoDados, (err, result) => {
    if (err){
      res.status(500).json({error: err.message});
      return;
    }
    res.send('Ticket atualizado com sucesso')
  });
}

export async function deleteTicket(req, res){
  const { id } = req.params;
  deleteTick(id, (err, result) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.send('Ticket excluído com sucesso');
  })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Verificar se o usuário existe no banco de dados e se as credenciais estão corretas
      const user = await findUserByEmailAndPassword(email, password);

      if (!user) {
          return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gerar token JWT
      const token = jwt.sign({ userId: user.id }, 'seuSegredoDoJWT', { expiresIn: '1h' });

      // Enviar token como resposta
      res.status(200).json({ token });
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const updateTicketStatus = (req, res) => {
  const { id } = req.params;
  const { novoStatus } = req.body;

  const query = 'UPDATE ticket SET status = ? WHERE id = ?';
  connection.query(query, [novoStatus, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar status do ticket:', err);
      res.status(500).json({ error: 'Erro interno ao atualizar status do ticket.' });
      return;
    }

    if (result.affectedRows > 0) {
      res.json({ message: `Status do ticket com ID ${id} atualizado com sucesso.` });
    } else {
      res.status(404).json({ error: `Ticket com ID ${id} não encontrado.` });
    }
  });
};