import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

const app = express();
//Conexion a DB

import mongoose from 'mongoose';
const uri = 'mongodb://localhost:27017/udemy';

//conexión en la nube
//const uri = 'mongodb+srv://user_udemy:QV9U7f0mWk53TYrb@cluster0-ajnw7.mongodb.net/udemy?retryWrites=true&w=majority';

const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }; //estas son configuraciones de moongose, 
//para hacer conexiones con string useNewUrlParser: true y es para poder utilizar esta funcion de mongoose 


// Or using promises
mongoose.connect(uri, options).then(
  () => { console.log('conectado a mongo DB') },
  err => { console.log(err) }
);


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
app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));
app.use('/api/login', require('./routes/login'));

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


//las rutas son las interacciones que podemos hacer con nuestro servidor

