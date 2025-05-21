const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());

app.use(session({
  secret: 'Secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(express.static('public'));

function checaLogin(req, res, next) {
  if (req.session.usuario) {
    next();
  } else {
    res.status(401).json({ mensagem: 'Você precisa estar logado.' });
  }
}

function checaAdmin(req, res, next) {
  if (req.session.usuario && req.session.usuario.admin) {
    next();
  } else {
    res.status(403).json({ mensagem: 'Acesso negado: somente administradores.' });
  }
}

// Cadastro de usuário
app.post('/api/cadastrar', (req, res) => {
  const novoUsuario = req.body;

  const usuarios = JSON.parse(fs.readFileSync('./dados/usuarios.json', 'utf-8'));

  const existe = usuarios.find(u => u.email === novoUsuario.email);
  if (existe) {
    return res.status(400).json({ mensagem: 'Usuário já existe!' });
  }

  // Garante que o novo usuário tenha a flag admin
  novoUsuario.admin = novoUsuario.admin || false;

  usuarios.push(novoUsuario);
  fs.writeFileSync('./dados/usuarios.json', JSON.stringify(usuarios, null, 2));
  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  const usuarios = JSON.parse(fs.readFileSync('./dados/usuarios.json', 'utf-8'));
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    req.session.usuario = {
      email: usuario.email,
      nome: usuario.nome,
      admin: usuario.admin || false
    };
    res.status(200).json({ sucesso: true, mensagem: `Bem-vindo, ${usuario.nome}!`, admin: usuario.admin || false });
  } else {
    res.status(401).json({ sucesso: false, mensagem: 'Email ou senha inválidos.' });
  }
});

// Verifica se está logado
app.get('/api/check-login', (req, res) => {
  if (req.session.usuario) {
    res.status(200).json({ loggedIn: true, usuario: req.session.usuario });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ mensagem: 'Erro ao sair.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ mensagem: 'Logout realizado com sucesso!' });
  });
});

// Criar ticket
app.post('/api/tickets', checaLogin, (req, res) => {
  const novoTicket = req.body;
  const tickets = JSON.parse(fs.readFileSync('./dados/tickets.json', 'utf-8'));

  novoTicket.id = Date.now().toString();
  novoTicket.data = new Date().toISOString();

  tickets.push(novoTicket);
  fs.writeFileSync('./dados/tickets.json', JSON.stringify(tickets, null, 2));
  res.status(201).json({ mensagem: 'Ticket enviado com sucesso!' });
});

// Listar todos os tickets
app.get('/api/tickets', checaLogin, checaAdmin, (req, res) => {
  const tickets = JSON.parse(fs.readFileSync('./dados/tickets.json', 'utf-8'));
  res.json(tickets);
});

// Excluir ticket
app.delete('/api/tickets/:id', checaLogin, checaAdmin, (req, res) => {
  const ticketId = req.params.id;
  let tickets = JSON.parse(fs.readFileSync('./dados/tickets.json', 'utf-8'));

  const novoArray = tickets.filter(ticket => ticket.id !== ticketId);

  if (novoArray.length === tickets.length) {
    return res.status(404).json({ mensagem: 'Ticket não encontrado.' });
  }

  fs.writeFileSync('./dados/tickets.json', JSON.stringify(novoArray, null, 2));
  res.json({ mensagem: 'Ticket removido com sucesso.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
