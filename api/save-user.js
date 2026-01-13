import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, cpf, email, phone, password } = req.body;

    // Cria tabela se não existir
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        cpf VARCHAR(14),
        email VARCHAR(255),
        phone VARCHAR(15),
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insere dados
    const result = await sql`
      INSERT INTO users (type, cpf, email, phone, password)
      VALUES (${type}, ${cpf || null}, ${email}, ${phone || null}, ${password || null})
      RETURNING id
    `;

    return res.status(200).json({ 
      success: true, 
      id: result.rows[0].id,
      message: 'Dados salvos com sucesso!' 
    });

  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return res.status(500).json({ 
      error: 'Erro ao salvar dados',
      details: error.message 
    });
  }
}
