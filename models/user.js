import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator'); //para validar un unico correo


const roles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} rol no válido'
}

const userSchema = new Schema({
  nombre: { type: String, required: [true, 'Nombre obligatorio'] },
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'], 
    unique: true,
  },
  pass: { type: String, required: [true, 'El password es obligatorio'] },
  date: { type: Date, default: Date.now },
  role: { type: String, default: 'USER', enum: roles },
  activo: { type: Boolean, default: true }
});

userSchema.plugin(uniqueValidator, { message: 'Error, esperaba un  {PATH} único' });

//proceso de ocultar la contraseña

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.pass;
  return obj;
} //esto es para eliminar el password del objeto del schema para qie a la hora de que hacemos hacemos la ppeticion del servidor  la respuesta obtenida en el objeto res, no envie el pass al usuario

//convertir a un modelo
const User = mongoose.model('User', userSchema);

export default User;
