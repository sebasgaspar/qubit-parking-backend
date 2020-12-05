/*
    api/vehicle
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { createInsert, search, getReport, pay } = require('../controllers/vehicle');

const router = Router();

router.post('/new', [
    check('vehicle', 'El vehiculo es obligatorio').not().isEmpty(),
    check('placa', 'La placa es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatorio').not().isEmpty(),
    check('hour', 'La hora es obligatorio').not().isEmpty(),
    validarCampos
], createInsert);

router.post('/seacrh', [
    check('placa', 'La contrasena es obligatorio').not().isEmpty(),
    validarCampos
], search);

router.get('/report/:wk', getReport);

router.post('/pay', pay);


module.exports = router;
