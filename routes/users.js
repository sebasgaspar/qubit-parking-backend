/*
    api/user
*/
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {createUser,login} = require('../controllers/users');

const router = Router();

router.post('/new', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('contrasena', 'La contrasena es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('empresaId', 'El empresaId es obligatorio').not().isEmpty(),
    validarCampos
],createUser);

router.post('/login', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('contrasena', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);



module.exports = router;
