// Script para testar conexão com Neon PostgreSQL
// Execute: node test-neon-connection.js

const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_nTIZca0A9ujB@ep-twilight-scene-acavjalj-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require';

async function testConnection() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    console.log('🔌 Conectando ao Neon PostgreSQL...\n');
    await client.connect();
    console.log('✅ Conexão estabelecida com sucesso!\n');

    // Cria tabela
    console.log('📝 Criando tabela users...');
    await client.query(`
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
    console.log('✅ Tabela users criada!\n');

    // Verifica se tabela existe
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    `);

    if (result.rows.length > 0) {
      console.log('✅ Tabela "users" encontrada no banco!\n');
      
      // Conta quantos registros existem
      const count = await client.query('SELECT COUNT(*) FROM users');
      console.log(`📊 Total de registros na tabela: ${count.rows[0].count}\n`);
      
      // Mostra todos os registros
      if (parseInt(count.rows[0].count) > 0) {
        const users = await client.query('SELECT * FROM users ORDER BY created_at DESC');
        console.log('👥 Usuários cadastrados:');
        console.log(users.rows);
      }
    } else {
      console.log('❌ Tabela "users" não encontrada');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
    console.log('\n🔌 Conexão fechada');
  }
}

testConnection();
