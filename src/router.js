// Inicializo express router
let router = require('express').Router();

// Defaulteo la respuesta
router.get('/', function(req, res) {
    res.json({
        status: '200',
        message: 'Anduvo'
    });
});

// Exportar API Routes
module.exports = router;