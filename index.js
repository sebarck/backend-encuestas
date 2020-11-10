
let express = require('express');
let apiRoutes = require('./src/routes/router');
let mongoose = require('mongoose');
let  cors = require('cors');
var cookieParser = require('cookie-parser');
require('./src/config/config')

// Start de la app
let app = express();

// Aca el Body Parser para parsear los requests
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
// Aca uso el API Routes
app.use('/api/v1', apiRoutes);
//Encabezados para HTTP

//Utilización de CORS


app.use(cors());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);


/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Acept', 'text/html,application/xhtml+xml,application/xml')
    next();
  }); 
*/
// Asignacion de puerto
var port = process.env.PORT || 8080;


// Hola mundo en el base
app.get('/', (req, res) => res.send('Backend de encuestas v1.0.0'));

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