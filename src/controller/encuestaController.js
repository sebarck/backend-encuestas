Encuesta = require('../models/encuestaModel');

exports.list = function (req, res) {
    Encuesta.get(function (err, encuesta) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Llamada con exito!",
            data: encuesta
        });
    });
};

exports.add = function (req, res) {
    console.log(JSON.stringify(req.body))

    var encuesta = new Encuesta();
    console.log(req.body);
    encuesta.poll_title = req.body.poll_title;
    encuesta.state = req.body.state;
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