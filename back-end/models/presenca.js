const { DataTypes } = require('sequelize');
const conection = require('../db/conection');
const membro = require('./membro');

const presenca = conection.define('presenca', {
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  presente: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

presenca.belongsTo(membro, { foreignKey: 'membroid' });

module.exports = presenca;
