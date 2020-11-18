const Encuesta = require('../models/encuestaModel');
const ObjectId = require('../models/usuarioModel').ObjectId
exports.list = function (req, res) {
    console.log(req.usuario)
    Encuesta.find({poll_state: "true", usuario_id: req.usuario._id})
        .exec((err, encuestas) => {
        if (err) {
            return (res.status(400).json({
                ok: "error",
                err: err
            }))
        }
        res.json({
            ok: true,
            message: "Llamada con exito!",
            data: encuestas
        });
    });
};

exports.get = function (req,res) {
    const id = req.params.id
    Encuesta.findById(id, (err, encuestaDB) => {
        if (err) {
            return (
                res.status(400).json({
                    ok: false,
                    err: err 
                })
            )
        }

        res.json({
            ok: true,
            encueta: encuestaDB
        })

    })
}

exports.getOne = function (req, res) {
    const id = req.params.id
    

    Encuesta.findById(id, (err,encuestaDB) => {
        if (err) {
            return (
                res.status(400).json({
                    ok: false,
                    err: err 
                })
         
            )
        }

        if (!encuestaDB){
            return (
                res.status(404).json({
                    ok: false,
                    err: "No se encontré la encuesta buscada"
                })
            )
        }

        res.json({
            ok: true,
            encuesta: encuestaDB
        })
    })
}


exports.add = function (req, res) {

    var encuesta = new Encuesta();
    encuesta.usuario_id = req.body.usuario_id
    encuesta.poll_title = req.body.poll_title;
    encuesta.poll_state = req.body.poll_state;
    encuesta.description = req.body.description;
    encuesta.createdAt = req.body.created;
    encuesta.modifiedAt = req.body.modified;
    encuesta.questions = req.body.questions;


    encuesta.save((err) => {
        if (err) {
            console.log((err));
            return (
                res.status(400).json({
                    ok: false,
                    err: err
                }))
        }
        res.json({
            ok: true,
            message: "Encuesta guardada correctamente!",
            data: encuesta
        })
    })
}

exports.update = function (req,res) {
    const id = req.params.id
    body = req.body
    
    Encuesta.findByIdAndUpdate(id, body, {
        new: true, 
        runValidators: true,
        context: 'query'
    }, (err, encuestaDB) => {
    
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
    
        res.json({
            ok: true,
            encuesta: encuestaDB
        })
    })
}

exports.delete = function(req,res) {
    const id = req.params.id
    Encuesta.findByIdAndUpdate(id, {state: false}, (err,encuesta) => {
        if(err) {
            return (
                res.status(400).json({
                    ok: false,
                    err: err
                })
            )
        }

        res.json({
            ok: true,
            encuesta: encuesta
        })

    })
}