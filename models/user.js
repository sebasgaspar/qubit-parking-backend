const Sequelize = require('sequelize');
const { connection } = require('../database/config');

const sequelize = connection()

const Users = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    usuario: {
        type: Sequelize.TEXT
    },
    contrasena: {
        type: Sequelize.TEXT,
    },
    correo: {
        type: Sequelize.TEXT
    },
    parkingId: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});


module.exports = {
    Users
};
