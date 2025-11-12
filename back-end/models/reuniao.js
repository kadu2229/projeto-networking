const { DataTypes } = require('sequelize');
const connection = require('../db/conection');
const membro = require('./membro');

const reuniao = connection.define('reuniao', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  datahora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// associação muitos-para-muitos: uma reunião tem vários membros e vice-versa
reuniao.belongsToMany(membro, { through: 'presencas' });
membro.belongsToMany(reuniao, { through: 'presencas' });

module.exports = reuniao;
