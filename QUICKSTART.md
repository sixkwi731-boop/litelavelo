# ⚡ Quick Start - Deploy Rápido na Vercel

## 🚀 3 Passos para Colocar no Ar

### 1️⃣ Teste Local
```bash
npm install
npm start
```
Abra http://localhost:3000 para verificar

---

### 2️⃣ Prepare para Deploy
```bash
npm run deploy
```
✅ Se compilar sem erros, está pronto!

---

### 3️⃣ Deploy na Vercel

#### Opção A: Via Web (Recomendado para iniciantes)
1. Suba o código para o GitHub
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Importe seu repositório
4. Clique em "Deploy"
5. **PRONTO!** 🎉

#### Opção B: Via CLI (Mais rápido)
```bash
npm install -g vercel
vercel login
vercel --prod
```
**PRONTO!** 🎉

---

## 📦 Arquivos Importantes

- ✅ `vercel.json` - Configuração da Vercel
- ✅ `package.json` - Dependências e scripts
- ✅ `.vercelignore` - Arquivos ignorados no deploy
- ✅ `build/` - Pasta gerada após `npm run build`

---

## 🔗 Depois do Deploy

Sua URL será algo como:
- `https://livelo-login.vercel.app`
- `https://seu-projeto-abc123.vercel.app`

Para domínio customizado:
1. Vá em Settings → Domains na Vercel
2. Adicione seu domínio
3. Configure o DNS

---

## ⚠️ Troubleshooting

**Build falhou?**
```bash
# Limpe e tente novamente
rm -rf node_modules build
npm install
npm run build
```

**Página em branco?**
- Verifique se `"homepage": "."` está no `package.json`
- Faça hard refresh: Ctrl+Shift+R (Chrome)

---

## 💡 Dicas

- ✅ Build passa localmente = vai funcionar na Vercel
- ✅ Cada push no GitHub = deploy automático
- ✅ Vercel é grátis para projetos pessoais
- ✅ Deploy leva ~30 segundos

---

**Qualquer dúvida, consulte [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.**

**Boa sorte! 🚀💖**
