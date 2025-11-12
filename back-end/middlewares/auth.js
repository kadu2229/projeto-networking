// middlewares/authAdmin.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).send('Token não fornecido');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.admin) {
      req.admin = true;
      return next();
    } else {
      return res.status(403).send('Acesso negado');
    }
  } catch (err) {
    return res.status(401).send('Token inválido ou expirado');
  }
};

module.exports = authAdmin;