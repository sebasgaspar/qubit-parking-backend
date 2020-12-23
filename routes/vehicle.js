/*
    api/vehicle
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { createInsert, search, getReport, pay, Update, deleteVehicle, getCupo } = require('../controllers/vehicle');

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

router.post('/report/:wk', getReport);

router.post('/pay', pay);

router.post('/update', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('hora2', 'La hora2 es obligatorio').not().isEmpty(),
    check('total', 'El total es obligatorio').not().isEmpty(),
    validarCampos
], Update);

router.delete('/delete/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
], deleteVehicle);

router.post('/cupo', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
], getCupo);

module.exports = router;
