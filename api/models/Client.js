const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  celular: String,
  produtosComprados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produto" }],
});

module.exports = mongoose.model("Cliente", clienteSchema);
