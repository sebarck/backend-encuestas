//Se separan todos los routers de los componententes de las APIs por recursos
//Para este caso, es el recruso usuario


const router = require('express').Router();
const usuarioController = require('../controller/usuarioController')


// Usuarios
router.route('/usuario')
    .post(usuarioController.add)
    .get(usuarioController.list)

router.route('/usuario/:id')
    .get(usuarioController.getOne)

router.route('/usuario/:id')
    .put(usuarioController.updateById)
    
    
module.exports = router;