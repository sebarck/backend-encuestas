//Se separan todos los routers de los componententes de las APIs por recursos
//Para este caso, es el recruso login


const router = require('express').Router();
const loginController = require('../controller/loginController')


// Usuarios
router.route('/login')
    .post(loginController.login)
        
module.exports = router;