const express = require("express");
const router = express.Router();
const Produto = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Configuração do armazenamento de arquivos para o upload de imagem
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Salva as imagens na pasta public/images
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname); // Gera um nome único para o arquivo
  },
});

// Opções de upload
const upload = multer({ storage: storage });

// Rota de cadastro de produtos
router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    let produtoData = req.body;
    if (req.file) {
      // Se uma imagem foi enviada, atualize os dados do produto com o link da imagem
      produtoData.banner = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }

    const produto = await Produto.create(produtoData);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de listagem de produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota de listagem de produtos por nome do checkout
router.get("/checkout/:nome", async (req, res) => {
  try {
    const produtos = await Produto.find({ checkoutLink: req.params.nome });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
