const jwt =  require('jsonwebtoken')

//=======================
// Verificar Token
//=======================

let verificaToken = (req, res, next) => {
    let authorization = req.get('Authorization')
    let token = authorization.split( ' ')[1]
    jwt.verify(token,process.env.SEED,(err,decode) => {
        if (err) {
            console.log(err)
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido',
                    err: err
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