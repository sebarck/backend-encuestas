
let express = require('express');
let apiRoutes = require('./src/routes/router');
let mongoose = require('mongoose');
require('./src/config/config')

// Start de la app
let app = express();

// Aca el Body Parser para parsear los requests
app.use(express.urlencoded({ extended: false }));


app.use(express.json());

// Asignacion de puerto
var port = process.env.PORT || 8080;

// Hola mundo en el base
app.get('/', (req, res) => res.send('Backend de encuestas v1.0.0'));

// Aca uso el API Routes
app.use('/api/v1', apiRoutes);

// Conectar Mongoose con Mongo Atlas
const uri = 'mongodb+srv://backendEncuestasUser:ItaliaRoma.01!@cluster0.ftjms.mongodb.net/backend_encuestas?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(uri, options);

mongo.then(() => {
    console.log('Conectado a Mongo');
}, error => {
    console.log(error, 'Error en la conexion');
})

// Deployar la app en el puerto configurado
app.listen(port, function () {
    console.log("Corriendo backend de encuestas en puerto " + port);
})