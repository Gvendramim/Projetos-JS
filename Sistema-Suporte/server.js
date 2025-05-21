const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/cadastrar', (req, res) => {
  const novoUsuario = req.body;
  const usuarios = JSON.parse(fs.readFileSync('./dados/usuarios.json', 'utf-8'));

  const existe = usuarios.find(u => u.email === novoUsuario.email);
  if (existe) {
    return res.status(400).json({ mensagem: 'Usuário já existe!' });
  }

  usuarios.push(novoUsuario);
  fs.writeFileSync('./dados/usuarios.json', JSON.stringify(usuarios, null, 2));
  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

app.post('/api/tickets', (req, res) => {
  const novoTicket = req.body;
  const tickets = JSON.parse(fs.readFileSync('./dados/tickets.json', 'utf-8'));

  novoTicket.id = tickets.length + 1;
  novoTicket.data = new Date().toISOString();

  tickets.push(novoTicket);
  fs.writeFileSync('./dados/tickets.json', JSON.stringify(tickets, null, 2));
  res.status(201).json({ mensagem: 'Ticket enviado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  const usuarios = JSON.parse(fs.readFileSync('./dados/usuarios.json', 'utf-8'));
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    res.status(200).json({ mensagem: `Bem-vindo, ${usuario.nome}!` });
  } else {
    res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
  }
});
