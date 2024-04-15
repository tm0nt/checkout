const express = require("express");
const router = express.Router();
const Usuario = require("../models/User");
const jwt = require("jsonwebtoken");
const Produto = require("../models/Product");
const Cliente = require("../models/Client");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const verificarToken = require("../middleware/verifyToken"); // Importar o middleware

router.get("/me", verificarToken, async (req, res) => {
  try {
    // Obtenha o ID do usuário do token decodificado
    const usuarioId = req.userId;

    // Encontre o usuário no banco de dados usando o ID
    const user = await Usuario.findById(usuarioId);

    // Se  usuário não for encontrado, retorne um erro
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Contar a quantidade de produtos registrados
    const quantidadeProdutos = await Produto.countDocuments();

    // Contar a quantidade de clientes
    const quantidadeClientes = await Cliente.countDocuments();

    // Retorna os dados do usuário, incluindo nome, email, efipay e quantidade de produtos/clientes
    const { nome, usuario, efipay } = user;
    res
      .status(200)
      .json({ nome, usuario, efipay, quantidadeProdutos, quantidadeClientes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para alterar senha e efipay
router.put("/me", verificarToken, async (req, res) => {
  // Se o middleware passar, significa que o usuário está autenticado
  try {
    const { senha, efipay } = req.body;
    const usuarioId = req.userId;

    // Verifique se a senha foi fornecida
    if (senha) {
      // Criptografar a nova senha
      const hash = await bcrypt.hash(senha, 10);
      // Atualizar a senha do usuário
      await Usuario.findByIdAndUpdate(usuarioId, { senha: hash });
    }

    // Verifique se efipay foi fornecido
    if (efipay) {
      // Atualizar o efipay do usuário
      await Usuario.findByIdAndUpdate(usuarioId, { efipay });
    }

    res.status(200).json({ message: "Dados atualizados com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de cadastro de usuário
router.post("/", async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    // Encontre o usuário no banco de dados
    const user = await Usuario.findOne({ usuario });

    // Se o usuário não existe, retorne um erro
    if (!user) {
      return res
        .status(401)
        .json({ auth: false, message: "Usuário não encontrado." });
    }

    // Verifique se a senha fornecida corresponde à senha armazenada
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ auth: false, message: "Senha incorreta." });
    }

    // Se as credenciais estiverem corretas, gere um token de autenticação
    const token = jwt.sign({ id: user._id }, "Qw3RtY77", { expiresIn: 86400 }); // Token válido por 24 horas
    res.status(200).json({ auth: true, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de listagem de usuários cadastrados
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de troca de senha de usuário
router.put("/:id/senha", async (req, res) => {
  try {
    await Usuario.findByIdAndUpdate(req.params.id, { senha: req.body.senha });
    res.status(200).json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de exclusão de usuário (exceto o primeiro usuário)
router.delete("/:id", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    if (usuarios.length === 1) {
      return res
        .status(400)
        .json({ error: "Impossível deletar o único usuário restante." });
    }
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
