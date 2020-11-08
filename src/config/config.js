// ======================
// Puerto
// ======================
process.env.PORT = process.env.PORT || 8080

// ======================
// Entorno
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ======================
// Base de datos
// ======================
let urlDB;
if ( process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://sr-udemy-node:pass-udemy-node@cluster0.ynodx.mongodb.net/usr-udemy-node?retryWrites=true&w=majority'
} 
else {
    urlDB = 'mongodb+srv://sr-udemy-node:pass-udemy-node@cluster0.ynodx.mongodb.net/usr-udemy-node?retryWrites=true&w=majority'
}
process.env.URL_DB = urlDB

// ======================
// Vencimiento del token
// ======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60*60*24*30

// ======================
// sEED de autenticación
// ======================
process.env.SEED = process.env.SEED || 'SECRET'