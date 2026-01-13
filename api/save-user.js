const { Pool } = require('pg');

export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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

    const { type, cpf, email, phone, password } = req.body;

    console.log('Salvando dados:', { type, cpf, email, phone });

    // Cria tabela se não existir
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        cpf VARCHAR(14),
        email VARCHAR(255),
        phone VARCHAR(15),
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insere dados
    const result = await pool.query(
      'INSERT INTO users (type, cpf, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [type, cpf || null, email, phone || null, password || null]
    );

    console.log('Dados salvos com ID:', result.rows[0].id);

    return res.status(200).json({ 
      success: true, 
      id: result.rows[0].id,
      message: 'Dados salvos com sucesso!' 
    });

  } catch (error) {
    console.error('Erro completo ao salvar:', error);
    return res.status(500).json({ 
      error: 'Erro ao salvar dados',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    await pool.end();
  }
}
