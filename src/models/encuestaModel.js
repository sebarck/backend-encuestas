var mongoose = require('mongoose');

// Creo el esquema
var encuestaSchema = mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuario'
    },
    poll_title: { 
        type: String, 
        required: true,
        defaut: 'Un valor'
    },
    poll_state: {
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    createAt: { 
        type: Date, 
        default: Date.now
    },
    updateAt: { 
        type: Date,
        default: Date.now 
    },
    questions: {
        total: Number,
        values: [{
            id: Number,
            index: Number,
            q_type: String,
            value: String,
            mandatory: Boolean,
            options: { 
                type: Array, 
                default: [] },
            filters: { 
                type: Object, 
                default: {} 
            },
        }]
    }

})

// Exporto el modelo
var Encuesta = module.exports = mongoose.model('encuesta', encuestaSchema);

// Aca modelo la funcion de lo que seria el get que se traduce en un find
module.exports.get = function (callback, limit) {
    Encuesta.find(callback).limit(limit);
}