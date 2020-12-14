const { Vehicle, sequelize } = require('../models/vehicle');
const { formatAMPM } = require('../helpers/functions')


const printerInsert = async (req, res) => {
    const placa = req.params.placa

    try {
        const vehicle = await search(placa, res);
        const time = formatAMPM(vehicle.hour);
        res.json({
            ok: true,
            vehicle,
            time
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
async function search(placa, res) {
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
        return vehicle;
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    printerInsert
}