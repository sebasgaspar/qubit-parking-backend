
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const { Users } = require('../models/user');

const createUser = async (req, res) => {

    const { usuario, contrasena, correo, empresaId } = req.body;
    try {
        const existeUser = await Users.findOne(
            {
                where: {
                    usuario
                }
            });
        if (existeUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya está registrado'
            });
        }
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(contrasena, salt);

        let newUsuario = await Users.create({
            usuario,
            contrasena:password,
            correo,
            empresaId
        }, {
            fields: ['usuario', 'contrasena', 'correo', 'empresaId']
        });
        //Generar mi JWT
        const token = await generarJWT(usuario.id)

        if (newUsuario) {
            res.json({
                ok: true,
                newUsuario,
                token
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}
const login=async (req, res)=>{
    const { usuario, contrasena} = req.body;

    try{
        const user = await Users.findOne(
            {
                where: {
                    usuario
                }
            });
        if(!user){
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });
        }
        //Validar password
        const validPassword =bcrypt.compareSync(contrasena,user.contrasena);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'La contraseña no es valida'
            });
        }

        const token=await generarJWT(user.id);

        res.json({
            ok:true,
            usuario:user,
            token:token
        })
    }
    catch(error){
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    
}
module.exports = {
    createUser,
    login
}