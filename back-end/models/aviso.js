const { DataTypes } = require('sequelize');
const connection = require('../db/conection');
const membro = require('./membro');

const aviso = connection.define('aviso', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  datacriacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// um aviso pertence a um membro (autor)
aviso.belongsTo(membro, { foreignKey: 'autorid' });

module.exports = aviso;
