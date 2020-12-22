const Sequelize = require('sequelize');
const { connection } = require('../database/config');

const {Users} =require('./user');

const sequelize = connection()

const Parking = sequelize.define('parkings', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_empresa: {
        type: Sequelize.TEXT
    },
    nombre: {
        type: Sequelize.TEXT,
    },
    direccion:{
        type: Sequelize.TEXT,
    },
    correo: {
        type: Sequelize.TEXT
    },
    logo:{
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false
});

Parking.hasMany(Users, {foreingKey: 'parkingId', sourceKey: 'id'});
Users.belongsTo(Parking, {foreingKey: 'parkingId', sourceKey: 'id'});

module.exports = {
    Empresa
};
