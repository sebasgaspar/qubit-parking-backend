const { Vehicle, sequelize } = require('../models/vehicle');
const { QueryTypes } = require('sequelize');
const { formatAMPM } = require('../helpers/functions')
const path = require('path');
const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
// Select the adapter based on your printer type
const device = new escpos.USB(1155, 22339);

const options = { encoding: "GB18030" /* default */ }
// encoding is optional


const printer = new escpos.Printer(device, options);

const printerInsert = async (req, res) => {
    const placa = req.params.placa

    try {
        const vehicle = await search(placa, res);
        const time = formatAMPM(vehicle.hour);
        await printIn(vehicle.placa, time, vehicle.fecha);
        res.json({
            ok: true,
            msg: 'Ticket dispensado'
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
async function printIn(placa, time, fecha) {
    await device.open(function (error) {
        const tux = path.join(__dirname, '../assets/Footer.png');
        const image = escpos.Image.load(tux, function (img) {
            printer
                .font('a')
                .align('ct')
                .style('NORMAL')
                .size(1, 1)
                .text('Manuel Cardenas')
                .size(0.1, 0.1)
                .text('NIT. 3.267.112-4')
                .text('IVA Regimen Comun')
                .text('-----------------------')
                .size(0.05, 0.05)
                .text('Calle 3 #8-20 Tel. 8514246 Zipaquira')
                .text('Horario de 7 a.m. a 7 p.m')
                .style('B')
                .size(1, 1)
                .text(`Placa: ${placa}`)
                .size(0.05, 0.05)
                .table([" ", " "])
                .tableCustom(
                    [
                        { text: "Tarifa", align: "LEFT", width: 0.23, style: 'B' },
                        { text: "Carro VR HR $2.500", align: "RIGHT", width: 0.49 },
                    ],
                    [
                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                    ],
                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                )
                .tableCustom(
                    [
                        { text: "Entrada", align: "LEFT", width: 0.23, style: 'B' },
                        { text: `${time} ${fecha}`, align: "RIGHT", width: 0.49 }
                    ],
                    [
                        { text: "Entrada", align: "LEFT", width: 0.33, style: 'B' },
                        { text: "1:18 PM", align: "RIGHT", width: 0.33 }
                    ],
                    { encoding: 'cp857', size: [0.05, 0.05] } // Optional
                )
                .size(0.001, 0.001)
                .image(img, 'D24')
                .then(() => {
                    printer
                        .feed(2)
                        .cut()
                        .close();
                });
        });

    });
}

module.exports = {
    printerInsert
}