const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log("Token recebido:", token);

  if (!token)
    return res
      .status(403)
      .send({ auth: false, message: "Token não fornecido." });

  // Remova o "Bearer " do token antes de verificar
  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(tokenWithoutBearer, "Qw3RtY77", function (err, decoded) {
    if (err) {
      console.error("Erro ao verificar token:", err);
      return res
        .status(500)
        .send({ auth: false, message: "Falha ao autenticar o token." });
    }

    console.log("Token decodificado:", decoded);
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
