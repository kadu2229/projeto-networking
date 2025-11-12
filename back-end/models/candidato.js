const { DataTypes } = require('sequelize');
const connection = require('../db/conection');
const bcrypt = require('bcryptjs');

const Candidato = connection.define('candidato', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  whyUs: {
    type: DataTypes.STRING,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aprovacao: {
    type: DataTypes.STRING,
    defaultValue: 'analise'
  }
});

// Criptografa a senha antes de salvar
Candidato.beforeCreate(async (user) => {
  user.senha = await bcrypt.hash(user.senha, 10);
});

module.exports = Candidato;
