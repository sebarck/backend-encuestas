// Inicializo express router
let router = require('express').Router();

// Defaulteo la respuesta
router.get('/', function (req, res) {
    res.json({
        status: '200',
        message: 'Anduvo'
    });
});

//Importo el controlador de encuestas
var encuestaController = require('../controller/encuestaController');

// Encuesta routes
router.route('/encuestas')
    .get(encuestaController.list)
    .post(encuestaController.add);

// Exportar API Routes
module.exports = router;