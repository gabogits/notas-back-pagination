import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(morgan('tiny')) //la configuracion de express va utilizar morgan

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

//para que podamos trabajar con solicitudes o respuestas de aplicaciones de www-form-urlencoded

/*
app.get('/', function (req, res) {
  res.send('Hola Mundo chavos');
});
*/


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.set('puerto', process.env.PORT || 3000); // process.env.PORT va tomar la configuracion que le asigne el servidor
app.listen(app.get('puerto'), function () {
  console.log("Escuchando el puerto", app.get('puerto'));
});

//morgan se utiliza para visualizar las peticiones que se hagan en nuestra rerminal en la terminal

//midlewares son unas funciones que se requieren antes de nosotros consumamos nuestras rutas

//nos sirve para configurar nuestro servidor para que puedan hacer peticion desde otros dominios

//cuando nosotros a nuestra aplicacion desde otros dominios, a veces podemos tener bloqueos de cors
