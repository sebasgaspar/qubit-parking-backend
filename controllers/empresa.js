const { Empresa } = require('../models/empresa');

const createEmpresa = async (req, res) => {


    const { nombre, nit, telefono, correo, clienteId } = req.body;
    try {
        let newEmpresa = await Empresa.create({
            nombre,
            nit,
            telefono,
            correo,
            clienteId
        }, {
            fields: ['nombre', 'nit', 'telefono', 'correo', 'clienteId']
        });
        if (newEmpresa) {
            res.send({
                ok: true,
                cliente: newEmpresa
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false
        });

    }
}

module.exports = {
    createEmpresa
}