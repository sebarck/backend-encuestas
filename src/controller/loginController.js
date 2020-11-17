const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuarioModel')
const app = express()


exports.login = function(req,res) {
    let body = req.body
    let email =  body.email
    let password = body.password

    if (!email || !password)  {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'password y email deben ser obligatorios'
            }
        })
    }

    Usuario.findOne({email: body.email}, (err,usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            })
        }

        try {
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o (Contraseña) incorrectos'
                    }
                })
            }
        }
        catch(err) {
            return res.status(500).json({
                    message: 'Error al recuperar la clave'
                })
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: 'bearer ' + token
        })
    })
}
