const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  efipay: {
    client_id: String,
    client_secret: String,
    certificado: Buffer,
  },
});

// Middleware para criptografar a senha antes de salvar
usuarioSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("senha")) return next();
  try {
    const hash = await bcrypt.hash(user.senha, 10);
    user.senha = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
