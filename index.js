import express from 'express';
import router from'./routes/index.js';
import db from './config/db.js';

import * as dotenv from 'dotenv';
dotenv.config({path: 'variables.env'})

const app= express();
//Conectar bd:
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));
//termina conexión bd   
const host = process.env.PORT || '0.0.0.0'; //Esta es para heroku, para que inyecte la dirección que quiera
const port = process.env.PORT || 3000;
app.set('view engine', 'pug');
//creamos nuestro propio midleware usando .use (que responde a todos los verbos de express):
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.ActualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';
   return next()
});

//Agregar bodyparser para leer los datos del formulario:
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); //aquí le estoy dando acceso a la app a nuestros archivos de public
app.use('/', router);
app.listen(port, host, () => {
    console.log('El servidor está funcionando')
});