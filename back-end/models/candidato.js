const { DataTypes } = require('sequelize');
const conection = require('../db/conection');

const cadidato = conection.define('candidato', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  whyUs: {
    type: DataTypes.STRING,
  },
  aprovacao: {
    type: DataTypes.STRING,
  }
})

module.exports = cadidato;