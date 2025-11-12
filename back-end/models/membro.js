const { DataTypes } = require('sequelize');
const connection = require('../db/conection');
const Candidato = require('./candidato');

const Membro = connection.define('membro', {
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profissao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  empresaAtual: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Candidato.hasOne(Membro, { onDelete: 'CASCADE' });
Membro.belongsTo(Candidato);

module.exports = Membro;
