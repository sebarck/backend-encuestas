const jwt =  require('jsonwebtoken')

//=======================
// Verificar Token
//=======================

let verificaToken = (req, res, next) => {
    let authentication = req.get('Authorization')
    let token = authentication.split( ' ')[1]
    jwt.verify(token,process.env.SEED,(err,decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }
        req.usuario = decode.usuario
        next();
    })
}

let verificaAdministrador = (req, res, next) => {
    let usuario =  req.usuario

    if (usuario.role === 'ADMIN-ROLE') {
        next()
    }
    else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Usuario no autorización para modificación'
            }
        })
    }
         
}

module.exports = {
    verificaToken,
    verificaAdministrador
}