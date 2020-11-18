// Inicializo express router
let router = require('express').Router();
//Importo el controlador de encuestas
const encuestaController = require('../controller/encuestaController');
//Importo el middleware para control de token
const { verificaToken } =  require('../middlewares/authentication')


// Defaulteo la respuesta
router.get('/', function (req, res) {
    res.json({
        status: '200',
        message: 'Anduvo'
    });
});



// Encuesta routes
router.route('/encuestas' )
    .get(verificaToken, encuestaController.list)
    .post(verificaToken, encuestaController.add)


router.route('/encuestas/:id', verificaToken)
    .get(verificaToken, encuestaController.getOne)
    .put(verificaToken, encuestaController.update)
    .delete(verificaToken, encuestaController.delete)


// Exportar API Routes
module.exports = router;


