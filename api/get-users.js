const { Pool } = require('pg');

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

  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    // Verifica se variável de ambiente existe
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL não configurada!');
      return res.status(500).json({ 
        error: 'Banco de dados não configurado',
        details: 'POSTGRES_URL não encontrada nas variáveis de ambiente'
      });
    }

    console.log('Tentando conectar ao banco...');
    
    // Cria tabela se não existir (com campo device)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        cpf VARCHAR(14),
        email VARCHAR(255),
        phone VARCHAR(15),
        password VARCHAR(255),
        device VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Adiciona coluna device se não existir (para bancos já criados)
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS device VARCHAR(255)
    `);

    // Busca todos os usuários
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');

    console.log('Dados encontrados:', result.rows.length);

    return res.status(200).json({ 
      success: true,
      users: result.rows,
      total: result.rows.length
    });

  } catch (error) {
    console.error('Erro completo:', error);
    return res.status(500).json({ 
      error: 'Erro ao buscar dados',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    await pool.end();
  }
}
