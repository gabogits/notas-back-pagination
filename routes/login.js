import express from 'express';
const router = express.Router();

const jwt = require('jsonwebtoken');




import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const body = req.body;

  try {
    //evaluando el email
    const usuarioDB = await User.findOne({email: body.email})
    if(!usuarioDB) {
      return res.status(400).json({
        mensaje: 'Email no encontrado'
      });
    }

    //evaluando contraseña

    if(!bcrypt.compareSync(body.pass, usuarioDB.pass)) {
      return res.status(400).json({
        mensaje: 'Contraseña incorrecta'
      });
    }
    const token = jwt.sign({
      data: usuarioDB
    }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });


    res.json({
      usuarioDB, 
      token });

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }

});


module.exports = router;