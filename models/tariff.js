const Sequelize = require('sequelize');
const { connection } = require('../database/config');

const sequelize = connection()

const Tariff = sequelize.define('tariffs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_transport: {
        type: Sequelize.INTEGER
    },
    fraccion: {
        type: Sequelize.INTEGER,
    },
    half: {
        type: Sequelize.INTEGER
    },
    hour: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});
module.exports = {
    Tariff,
    sequelize
};
