import axios from 'axios';
import { saveUserToLocal, getUsersFromLocal, deleteUsersFromLocal } from './localStorage';

// Verifica se está em produção (Vercel)
const isProduction = process.env.NODE_ENV === 'production';
const ADMIN_PASSWORD = 'livelo2026';

// Salva dados do usuário
export const saveUserData = async (data) => {
  try {
    // Em desenvolvimento, usa localStorage
    if (!isProduction) {
      console.log('Salvando localmente (desenvolvimento):', data);
      return saveUserToLocal(data);
    }
    
    // Em produção, usa API
    const response = await axios.post('/api/save-user', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    // Fallback para localStorage se API falhar
    return saveUserToLocal(data);
  }
};

// Busca todos os usuários (admin)
export const getUsers = async (password) => {
  try {
    // Verifica senha
    console.log('Senha recebida:', password);
    console.log('Senha esperada:', ADMIN_PASSWORD);
    console.log('São iguais?', password === ADMIN_PASSWORD);
    
    if (password !== ADMIN_PASSWORD) {
      throw new Error('Senha incorreta');
    }

    // Em desenvolvimento, usa localStorage
    if (!isProduction) {
      console.log('Buscando dados localmente (desenvolvimento)');
      const users = getUsersFromLocal();
      return { 
        success: true,
        users: users,
        total: users.length
      };
    }
    
    // Em produção, usa API
    const response = await axios.get(`/api/get-users?password=${password}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

// Deleta todos os usuários (admin)
export const deleteAllUsers = async (password) => {
  try {
    // Verifica senha
    if (password !== ADMIN_PASSWORD) {
      throw new Error('Senha incorreta');
    }

    // Em desenvolvimento, usa localStorage
    if (!isProduction) {
      console.log('Limpando dados localmente (desenvolvimento)');
      return deleteUsersFromLocal();
    }
    
    // Em produção, usa API
    const response = await axios.delete('/api/delete-users', {
      data: { password }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar dados:', error);
    throw error;
  }
};
