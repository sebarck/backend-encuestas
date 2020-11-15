
let express = require('express');
let apiRoutes = require('./src/routes/router');
let mongoose = require('mongoose');
let cors = require('cors');
var cookieParser = require('cookie-parser');
require('./src/config/config')

// Start de la app
let app = express();

// Aca el Body Parser para parsear los requests
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});
app.options('*', cors());
// Aca uso el API Routes
app.use('/api/v1', apiRoutes);
//Encabezados para HTTP

//Utilización de CORS
app.use(cors({
  origin: process.env.ORIGIN
}));

// Hola mundo en el base
app.get('/', (req, res) => res.send('Backend de encuestas v1.0.0'));

// Conectar Mongoose con Mongo Atlas
const uri = process.env.URL_DB;
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(uri, options);

mongo.then(() => {
  console.log('Conectado a Mongo');
}, error => {
  console.log(error, 'Error en la conexion');
})

// Deployar la app en el puerto configurado
app.listen(process.env.PORT, function () {
  console.log("Corriendo backend de encuestas en puerto " + process.env.PORT);
})