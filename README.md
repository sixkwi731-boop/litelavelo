# 🎨 Tela de Login Livelo

Tela de login desenvolvida em React, replicando o design da Livelo com labels flutuantes e validação de formulário.

![Livelo Login](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Status](https://img.shields.io/badge/status-ready-success)

## 🚀 Deploy na Vercel

### Opção 1: Deploy Automático (Recomendado)

[![Deploy com Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Clique no botão acima
2. Faça login na Vercel
3. Importe este repositório
4. A Vercel detectará automaticamente as configurações
5. Clique em "Deploy"
6. Pronto! Seu site estará no ar 🚀

### Opção 2: Deploy via CLI

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel
```

### Opção 3: Deploy via GitHub

1. Faça push do projeto para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Importe seu repositório do GitHub
5. A Vercel configurará automaticamente
6. Clique em "Deploy"

## 💻 Desenvolvimento Local

### Instalação

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm start
```

O projeto será aberto automaticamente em [http://localhost:3000](http://localhost:3000)

### Build de produção

```bash
npm run build
```

Gera uma build otimizada na pasta `build/`

## ✨ Funcionalidades

- ✅ **Labels flutuantes** com animação suave
- ✅ Campo de CPF ou E-mail com validação visual
- ✅ Campo de senha com toggle para mostrar/ocultar
- ✅ Ícones que mudam de cor quando ativos
- ✅ Validação de formulário em tempo real
- ✅ Botão que só fica ativo quando campos preenchidos
- ✅ Border focus com destaque rosa
- ✅ Links "Esqueceu sua senha?" e "Criar conta"
- ✅ Design 100% responsivo
- ✅ Visual idêntico ao design oficial da Livelo
- ✅ Logo e favicon oficiais da Livelo

## 🎨 Tecnologias

- **React 18** - Framework JavaScript
- **CSS3** - Estilização com animações
- **React Hooks** - useState para gerenciamento de estado
- **SVG** - Ícones e logo vetoriais

## 📁 Estrutura do Projeto

```
livelo/
├── public/
│   ├── index.html          # HTML base
│   ├── icon.svg            # Favicon da Livelo
│   └── logo-livelo.svg     # Logo da Livelo
├── src/
│   ├── components/
│   │   ├── Login.jsx       # Componente de login
│   │   └── Login.css       # Estilos do login
│   ├── App.js              # Componente principal
│   ├── App.css             # Estilos globais
│   ├── index.js            # Entry point
│   └── index.css           # Reset CSS
├── package.json            # Dependências
├── vercel.json            # Configuração Vercel
└── README.md              # Documentação
```

## 🎨 Cores da Livelo

- **Rosa Principal:** `#E91E63` / `#FF0A8C`
- **Cinza Texto:** `#1a1a1a`
- **Cinza Placeholder:** `#999`
- **Cinza Borda:** `#d4d4d4`
- **Azul Link:** `#1565c0`

## 🔧 Customização

### Alterar cores

Edite o arquivo `src/components/Login.css` e modifique as variáveis de cor:

```css
/* Exemplo: mudar cor principal */
.login-input:focus {
  border: 2px solid #E91E63; /* Sua cor aqui */
}
```

### Adicionar validações

Edite o arquivo `src/components/Login.jsx` na função `handleSubmit`:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Adicione sua lógica de autenticação aqui
  console.log('Login:', { email, password });
};
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com 💖 usando React
