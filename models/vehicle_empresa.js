const Sequelize = require('sequelize');
const { connection } = require('../database/config');

const sequelize = connection()

const Vehicle_Parking = sequelize.define('vehicle_parkings', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    vehicleId: {
        type: Sequelize.INTEGER
    },
    parkingId: {
        type: Sequelize.INTEGER,
    },
    factura:{
        type: Sequelize.INTEGER,
    }
}, {
    timestamps: false
});
module.exports = {
    Vehicle_Parking,
    sequelize
};
