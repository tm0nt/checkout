const express = require("express");
const router = express.Router();
const Cliente = require("../models/Client");
const Produto = require("../models/Product");
const pdf = require("pdfkit");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

// Rota de cadastro de clientes
router.post("/", async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota de listagem de clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para baixar todos os dados dos clientes em PDF
router.get("/pdf", async (req, res) => {
  try {
    const clientes = await Cliente.find().populate("produtosComprados");
    const pdfDoc = new pdf();
    pdfDoc.pipe(fs.createWriteStream("clientes.pdf"));
    clientes.forEach((cliente) => {
      pdfDoc.text(`Nome: ${cliente.nome}`);
      pdfDoc.text(`Email: ${cliente.email}`);
      pdfDoc.text(`Celular: ${cliente.celular}`);
      pdfDoc.text("Produtos Comprados:");
      cliente.produtosComprados.forEach((produto) => {
        pdfDoc.text(`  - Nome: ${produto.nome}, Valor: ${produto.valor}`);
      });
      pdfDoc.text("--------------------------------------------------------");
    });
    pdfDoc.end();
    res.download("clientes.pdf");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para baixar todos os dados dos clientes em Excel
router.get("/xlsx", async (req, res) => {
  try {
    const clientes = await Cliente.find().populate("produtosComprados");
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(
      clientes.map((cliente) => {
        const produtosComprados = cliente.produtosComprados
          .map((produto) => `${produto.nome} (R$${produto.valor})`)
          .join(", ");
        return {
          Nome: cliente.nome,
          Email: cliente.email,
          Celular: cliente.celular,
          "Produtos Comprados": produtosComprados,
        };
      }),
    );
    xlsx.utils.book_append_sheet(workbook, worksheet, "Clientes");
    const xlsxFilePath = path.join(__dirname, "..", "clientes.xlsx");
    xlsx.writeFile(workbook, xlsxFilePath);
    res.download(xlsxFilePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
