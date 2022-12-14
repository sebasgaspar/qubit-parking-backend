
const { Vehicle, sequelize } = require('../models/vehicle');
const { Vehicle_Parking } = require('./../models/vehicle_empresa');
const { Tariff } = require('../models/tariff');
const { QueryTypes } = require('sequelize');
const { parseTime, getTime } = require('../helpers/functions');

const createInsert = async (req, res) => {

    const { vehicle, placa, fecha, hour, pay, parkingId } = req.body;
    try {

        let newVehicle = await Vehicle.create({
            vehicle,
            placa,
            fecha,
            hour,
            pay,
        }, {
            fields: ['vehicle', 'placa', 'fecha', 'hour', 'pay']
        });
        let id = newVehicle['dataValues']['id'];
        let vehicle_parking = await Vehicle_Parking.create({
            vehicleId: id,
            parkingId: parkingId,
            factura: 0
        }, {
            fields: ['vehicleId', 'parkingId', 'factura']
        });
        if (newVehicle) {
            res.json({
                ok: true,
                newVehicle,
                vehicle_parking
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Falló'
        });
    }
}
async function getLast(id) {
    try {
        let last = await sequelize.query(`SELECT max(factura) FROM vehicle_parkings WHERE "parkingId"=${id};`, { type: sequelize.QueryTypes.SELECT, raw: false })
            .then(function (result) {
                return result[0]['max'];
            });
        if (last !== null) {
            return last;
        } else {
            return 0;
        }
    }
    catch (error) {
        return error;
    }
}
const Update = async (req, res) => {
    const { id, hora2, total, comentario, parkingId } = req.body;
    let factura = await getLast(parkingId);
    console.log(factura);
    factura = factura + 1
    try {
        let vehicle_parking = await Vehicle_Parking.update({ factura: factura }, {
            where: {
                vehicleId: id
            }
        });
        let newVehicle = await Vehicle.update({ hour2: hora2, total: total, comentario: comentario, pay: true }, {
            where: {
                id: id
            }
        });
        if (newVehicle) {
            res.json({
                ok: true,
                newVehicle,
                factura,
                vehicle_parking
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Falló'
        });
    }
}
const search = async (req, res) => {
    const { placa } = req.body;
    try {
        const vehicle = await Vehicle.findOne(
            {
                where: {
                    placa,
                    pay: false
                },
                order: [
                    ['id', 'DESC'],
                ]
            });
        if (!vehicle) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehiculo no encontrado'
            });
        }

        res.json({
            ok: true,
            vehicle
        })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const getReport = async (req, res) => {
    try {
        const time = req.params.wk
        const { date, id } = req.body;
        console.log(date);
        let vehicle = null;
        if (time == 0) {
            vehicle = await sequelize.query(`select v.* from vehicles v inner join vehicle_parkings vp on v.id=vp."vehicleId" where fecha = DATE '${date}' and vp."parkingId"=${id}`, { type: QueryTypes.SELECT });
        } else {
            vehicle = await sequelize.query(`select v.* from vehicles v inner join vehicle_parkings vp on v.id=vp."vehicleId" where fecha > now() - interval '${time} week' and vp."parkingId"=${id};`, { type: QueryTypes.SELECT });
        }
        console.log(vehicle);
        if (!vehicle) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehiculo no encontrado'
            });
        }
        res.json({
            ok: true,
            vehicle
        })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const pay = async (req, res) => {
    try {
        let total = 0;
        const { cStart, cStop, id_transport } = req.body;
        var tStart = parseTime(cStart);
        var tStop = parseTime(cStop);

        const value = parseInt((tStop - tStart) / (1000 * 60));

        time = getTime(value);

        const tarrif = await Tariff.findOne(
            {
                where: {
                    id_transport,
                }
            });
        total = (tarrif['fraccion'] * time['P']) + (tarrif['half'] * time['M']) + (tarrif['hour'] * time['H']);
        res.json({
            ok: true,
            value,
            total
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const getCupo = async (req, res) => {
    const { id } = req.body;
    try {
        const cupo = await sequelize.query(`SELECT v.vehicle , COUNT(v.vehicle) from vehicles v inner join vehicle_parkings vp on v.id=vp."vehicleId" where vp."parkingId"=${id} and v.pay=false group by v.vehicle`, { type: QueryTypes.SELECT, raw: false })
            .then(function (result) {
                return result;
            });
        if (!cupo) {
            return res.status(404).json({
                ok: false,
                msg: 'Fallo realizando la busqueda'
            });
        }
        res.json({
            ok: true,
            cupo
        })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const deleteVehicle = async (req, res) => {
    const id = req.params.id
    try {
        const vehicle = await Vehicle.destroy({
            where: {
                id: id
            }
        });
        if (!vehicle) {
            return res.status(404).json({
                ok: false,
                msg: 'Vehiculo no encontrado'
            });
        }

        res.json({
            ok: true,
            vehicle
        })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
module.exports = {
    createInsert,
    search,
    getReport,
    pay,
    Update,
    deleteVehicle,
    getCupo
}