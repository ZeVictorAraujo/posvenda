import jwt from 'jsonwebtoken'; // Importar o pacote JWT para gerar tokens
import { findUserByEmailAndPassword } from './userService.js'; // Função para buscar usuário no banco de dados

// Função para autenticar usuário
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

export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verifica se o token está expirado ou não
      const decodedToken = jwt.decode(token);
      return decodedToken && decodedToken.exp * 1000 > Date.now(); // Multiplica por 1000 para converter segundos para milissegundos
    }
    return false;
  };
