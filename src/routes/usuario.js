//Dentro de esta carpeta, se van a poner todos los controladores o ruteos.
//Cada entidad va ser una colección dentro de la base de datos


const router = require('express').Router();
const usuarioController = require('../controller/usuarioController')


// Usuarios
router.route('/usuario')
    .post(usuarioController.add)
    .get(usuarioController.list)


module.exports = router;