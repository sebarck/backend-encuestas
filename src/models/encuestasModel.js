var mongoose = require('mongoose');

// Creo el esquema
var encuestaSchema = mongoose.Schema({
    
})

// Exporto el modelo
var Encuesta = module.exports = mongoose.model('encuesta', encuestaSchema);

// Aca modelo la funcion de lo que seria el get que se traduce en un find
module.exports.get = function (callback, limit) {
    Encuesta.find(callback).limit(limit);
}