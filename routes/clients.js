/*
    api/clients
*/
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {createClient,getClients,getOneClient,updateClient} = require('../controllers/clients');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('cedula', 'La cedula es obligatorio').not().isEmpty(),
    validarCampos
],createClient);

router.get('/',getClients);
router.get('/:id',getOneClient);
router.put('/:id', updateClient);


module.exports = router;
