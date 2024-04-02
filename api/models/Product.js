const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, required: true },
  banner: String,
  cor: String,
  checkoutLink: String
});

module.exports = mongoose.model('Produto', produtoSchema);
