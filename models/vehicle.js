const Sequelize = require('sequelize');
const { connection } = require('../database/config');

const sequelize = connection()

const Vehicle = sequelize.define('vehicles', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    vehicle: {
        type: Sequelize.INTEGER
    },
    placa: {
        type: Sequelize.TEXT,
    },
    fecha: {
        type: Sequelize.DATE
    },
    hour: {
        type: Sequelize.TIME
    },
    hour2: {
        type: Sequelize.TIME
    },
    total:{
        type: Sequelize.INTEGER
    },
    comentario: {
        type: Sequelize.TEXT,
    },
    pay:{
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false
});
module.exports = {
    Vehicle,
    sequelize
};
