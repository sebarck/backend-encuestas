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
    console.log(req.body);
    var encuesta = new Encuesta();
    encuesta.poll_title = req.body.poll_title;
    encuesta.poll_state = req.body.poll_state;
    encuesta.description = req.body.description;
    encuesta.created = req.body.created;
    encuesta.modified = req.body.modified;
    encuesta.questions = req.body.questions;

    encuesta.save(function (err) {
        if (err)
            res.json(err)
        res.json({
            message: "Encuesta guardada correctamente!",
            data: encuesta
        });
    });
}