/*
    api/pos
*/
const { Router } = require('express');

const { printerInsert } = require('../controllers/pos');

const router = Router();


router.get('/ingreso/:placa', printerInsert);
// router.get('/ingreso/:placa', printerExit);


module.exports = router;
