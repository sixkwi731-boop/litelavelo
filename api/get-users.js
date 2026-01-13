import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Apenas GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Senha de acesso simples (você pode mudar)
  const { password } = req.query;
  const ADMIN_PASSWORD = 'livelo2026'; // MUDE ESTA SENHA!

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  try {
    // Busca todos os usuários
    const result = await sql`
      SELECT * FROM users 
      ORDER BY created_at DESC
    `;

    return res.status(200).json({ 
      success: true,
      users: result.rows,
      total: result.rows.length
    });

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return res.status(500).json({ 
      error: 'Erro ao buscar dados',
      details: error.message 
    });
  }
}
