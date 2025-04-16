const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, "tasks.json");

app.use(express.static(__dirname));
app.use(express.json());

// Endpoint para salvar tarefas
app.post("/save", (req, res) => {
  fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error("Erro ao salvar tarefas:", err);
      return res.status(500).send("Erro ao salvar tarefas.");
    }
    res.status(200).send("Tarefas salvas com sucesso.");
  });
});

// Endpoint para carregar tarefas
app.get("/load", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      console.warn("Nenhum dado anterior encontrado.");
      return res.json({});
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      res.status(500).send("Erro ao ler arquivo de tarefas.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
