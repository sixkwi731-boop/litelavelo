# 🚀 Deploy na Vercel - Guia Rápido

## ✅ Código já está no GitHub!

**Repositório:** https://github.com/sixkwi731-boop/litelavelo

---

## 📝 Passo a Passo para Deploy:

### 1️⃣ Acessar Vercel

Acesse: https://vercel.com/new

### 2️⃣ Importar Repositório

1. Clique em **"Import Git Repository"**
2. Se ainda não conectou GitHub, clique em **"Continue with GitHub"**
3. Procure por: `sixkwi731-boop/litelavelo`
4. Clique em **"Import"**

### 3️⃣ Configurar Projeto

**Framework Preset:** Create React App (detectado automaticamente)

**Build Settings:** (já configuradas automaticamente)
- Build Command: `npm run build`
- Output Directory: `build`

### 4️⃣ Adicionar Variável de Ambiente ⚠️ **IMPORTANTE!**

**ANTES de clicar em Deploy:**

1. Clique em **"Environment Variables"**
2. Adicione a variável:

**Key:**
```
POSTGRES_URL
```

**Value:**
```
postgresql://neondb_owner:npg_nTIZca0A9ujB@ep-twilight-scene-acavjalj-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

3. Deixe marcado: ✅ Production ✅ Preview ✅ Development

### 5️⃣ Deploy

Clique em **"Deploy"**

Aguarde 1-3 minutos... ☕

### 6️⃣ Pronto! 🎉

Sua URL será algo como:
```
https://litelavelo.vercel.app
```

ou

```
https://litelavelo-seu-usuario.vercel.app
```

---

## 🎯 Após o Deploy:

### **Testar o Sistema:**

1. Acesse sua URL da Vercel
2. Faça um cadastro de teste
3. Complete o fluxo (telefone, etc)
4. Clique no ícone 🔑
5. Senha: `livelo2026`
6. **Veja seus dados salvos no Neon PostgreSQL!** ✨

### **Verificar no Neon:**

1. Acesse: https://console.neon.tech
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Execute:
   ```sql
   SELECT * FROM users;
   ```
5. Veja os dados salvos!

---

## 📊 Diferença Entre Local e Produção:

| Ambiente | Banco de Dados | Status |
|----------|---------------|--------|
| **Local** (npm start) | localStorage | ✅ Funcionando |
| **Vercel** (após deploy) | Neon PostgreSQL | ⏳ Vai funcionar após deploy |

---

## ⚠️ IMPORTANTE:

### **Após Deploy, teste:**

1. Faça um cadastro no site
2. Acesse o Painel Neon
3. Execute: `SELECT * FROM users;`
4. **Se aparecer os dados = Sistema 100% funcional!** 🎉

---

## 🔄 Próximas Atualizações:

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Sua mensagem"
git push
```

A Vercel fará **deploy automático!** 🚀

---

## 🎁 Bônus - Domínio Customizado:

Depois do deploy, você pode adicionar um domínio:

1. Vá em **Settings** → **Domains**
2. Adicione: `seusite.com.br`
3. Configure DNS
4. Pronto!

---

**Tudo pronto para o deploy! 🚀**

**Link direto:** https://vercel.com/new/git/external?repository-url=https://github.com/sixkwi731-boop/litelavelo
