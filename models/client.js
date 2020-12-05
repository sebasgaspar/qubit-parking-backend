const Sequelize = require('sequelize');
const { connection } = require('../database/config');

const {Empresa} =require('./empresa');

const sequelize = connection()

const Cliente = sequelize.define('clientes', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.TEXT
    },
    apellido: {
        type: Sequelize.TEXT,
    },
    correo: {
        type: Sequelize.TEXT
    },
    telefono: {
        type: Sequelize.TEXT
    },
    cedula: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

Cliente.hasMany(Empresa, {foreingKey: 'clienteId', sourceKey: 'id'});
Empresa.belongsTo(Cliente, {foreingKey: 'clienteId', sourceKey: 'id'});

module.exports = {
    Cliente
};
