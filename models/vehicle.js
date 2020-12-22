const Sequelize = require('sequelize');
const { connection } = require('../database/config');

const { Vehicle_Parking } = require('./vehicle_empresa');
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
    total: {
        type: Sequelize.INTEGER
    },
    comentario: {
        type: Sequelize.TEXT,
    },
    pay: {
        type: Sequelize.BOOLEAN,
    }
}, {
    timestamps: false
});

Vehicle.hasMany(Vehicle_Parking, { foreingKey: 'vehicleId', sourceKey: 'id' });
Vehicle_Parking.belongsTo(Vehicle, { foreingKey: 'vehicleId', sourceKey: 'id' });

module.exports = {
    Vehicle,
    sequelize
};
