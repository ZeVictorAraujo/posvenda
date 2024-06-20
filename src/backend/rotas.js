import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { createTicket, getAllTicket, updateTicket, deleteTicket, updateTicketStatus} from './controler.js';
import { loginUser } from './authController.js';

const app = express();

app.use(express.json());
app.use(cors());

// Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Formato do header: Bearer token

    jwt.verify(token, 'seuSegredoDoJWT', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Falha na verificação do token' });
        }
        req.userId = decoded.userId; // Adiciona o ID do usuário decodificado ao objeto req
        next();
    });
};

app.post('/auth/login', loginUser);

app.get('/ticket', getAllTicket);
app.post('/ticket', createTicket);
app.put('/ticket/:id', updateTicket);
app.delete('/ticket/:id', verifyToken, deleteTicket);
app.put('/ticket/:id', updateTicketStatus);

app.listen(3000, () => {
    console.log(`Servidor funcionando na porta 3000`);
});
