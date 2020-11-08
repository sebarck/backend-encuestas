const Usuario = require('../models/usuarioModel')
const bcrypt = require('bcrypt')
const { Mongoose } = require('mongoose')


exports.add = function (req, res) {
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
        
    });

    usuario.save( (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        //usuarioDB.password = null


        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })
}


exports.list = function (req,res) {

    Usuario.find({ estado:true })
    .exec((err,usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        Usuario.countDocuments({ estado:true }, (err, conteo) => {
            res.json({
                ok: true,
                usuarios,
                cuantos: conteo
            })
        })

       
    })
}