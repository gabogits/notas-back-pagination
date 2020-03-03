import express from 'express';
const router = express.Router();
import User from '../models/user';

const {verificarAuth, verificarAdministador} = require('../middlewares/autenticacion')
// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

const _ = require('underscore');


router.post('/nuevo-usuario', async (req, res) => {
  // const body = req.body;
  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role:req.body.role
  };

  body.pass = bcrypt.hashSync(req.body.pass, saltRounds)

  try {
    const usuarioDB = await User.create(body);
    res.status(200).json(usuarioDB)

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});



router.put('/usuario/:id', [verificarAuth, verificarAdministador], async (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['nombre', 'email', 'pass', 'activo']);

  if(body.pass) {
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds)
  }
  try {
    const usuarioDB = await User.findByIdAndUpdate(id, body, {new:true, runValidators:true})
    res.json(usuarioDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});


module.exports = router;