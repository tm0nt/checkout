const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/client');
const produtoRoutes = require('./routes/product');
const usuarioRoutes = require('./routes/user');
const cors = require('cors');
const path = require("path")

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
  });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// Configuração do CORS para permitir acesso do localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Rotas
app.use('/client', clienteRoutes);
app.use('/product', produtoRoutes);
app.use('/user', usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
