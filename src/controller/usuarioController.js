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

exports.getOne = function (req, res) {
    let id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        
        res.json({
            ok: true,
            usuario
        })
    })
}

exports.updateById = function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email','role','password']); 
    body.password = bcrypt.hashSync(body.password,10),

    Usuario.findByIdAndUpdate(id, body, {
            new: true, 
            runValidators: true,
            context: 'query'
        }, (err, usuarioDB) => {
        
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
        
            res.json({
                ok: true,
                usuario: usuarioDB
            })
        })
    
}