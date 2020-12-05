const express = require('express');
const path = require('path');
require('dotenv').config();



// App de Express
const app = express();


//Lectura y parseo del body
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Node Server
const server = require('http').createServer(app);


// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Mis Rutas
app.use('/api/client', require('./routes/clients'));
app.use('/api/empresa', require('./routes/empresa'));
app.use('/api/user', require('./routes/users'));
app.use('/api/vehicle', require('./routes/vehicle'));
app.use('/api/pos', require('./routes/pos'));


server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});