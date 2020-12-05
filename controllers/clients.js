const { Cliente } = require('../models/client');

const createClient = async (req, res) => {

    const { nombre, apellido, correo, telefono, cedula } = req.body;
    try {
        let newClient = await Cliente.create({
            nombre,
            apellido,
            correo,
            telefono,
            cedula
        }, {
            fields: ['nombre', 'apellido', 'correo', 'telefono', 'cedula']
        });
        if (newClient) {
            res.send({
                ok: true,
                cliente: newClient
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false
        });

    }
}

const getClients = async (req, res) => {
    try {
        const clients = await Cliente.findAll();
        res.json({
            data: clients
        })
    }
    catch (e) {
        res.status(500).json({
            ok: false
        });
    }
}

const getOneClient = async (req, res) => {
    try {
        const { id } = req.params
        const cliente = await Cliente.findOne(
            {
                where: {
                    id
                }
            });
        res.json({
            data: cliente
        });

    }
    catch (e) {
        res.status(500).json({
            ok: false
        });
    }
}

const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, correo, telefono, cedula } = req.body;

        const clients = await Cliente.findAll({
            attribute: ['id', 'nombre', 'apellido', 'correo', 'telefono', 'cedula'],
            where: {
                id
            }
        });

        if (clients.length > 0) {
            clients.forEach(async client => {
                await client.update({
                    nombre,
                    apellido,
                    correo,
                    telefono,
                    cedula
                });
            })
        }
        return res.json({
            ok: true,
            message: 'Client Update',
            data: clients
        })
    } catch (e) {

    }
}

module.exports = {
    createClient,
    getClients,
    getOneClient,
    updateClient
}