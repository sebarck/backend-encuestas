//Los archivos de esta carpeta maneja el modelo de datos

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN-ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La constraseña es bligatoria']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, // default: 'USER_ROLE'
    estado: {
        type: Boolean, 
        default: true
    }, // Boolean
});




//Se transorma el esquema, sacando los campos que no quiero devolver.
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
}


//La documentación pide esto para poder manejar los mensajes de una forma más amigable
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('Usuario', usuarioSchema);