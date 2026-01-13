import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Apenas DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Senha de acesso
  const { password } = req.body;
  const ADMIN_PASSWORD = 'livelo2026'; // MUDE ESTA SENHA!

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  try {
    // Deleta todos os usuários
    const result = await sql`
      DELETE FROM users
    `;

    return res.status(200).json({ 
      success: true,
      message: 'Todos os dados foram deletados',
      deletedCount: result.rowCount
    });

  } catch (error) {
    console.error('Erro ao deletar dados:', error);
    return res.status(500).json({ 
      error: 'Erro ao deletar dados',
      details: error.message 
    });
  }
}
