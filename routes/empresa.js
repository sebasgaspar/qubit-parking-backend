/*
    api/empresa
*/
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {createEmpresa} = require('../controllers/empresa');

const router = Router();

router.post('/new', [    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nit', 'El nit es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('clienteId', 'El id_cliente es obligatorio').not().isEmpty(),

    validarCampos
],createEmpresa);


module.exports = router;
