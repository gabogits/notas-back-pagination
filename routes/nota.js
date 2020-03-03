import express from 'express';
const router = express.Router();

//importar el modelo nota
import Nota from '../models/nota';

const {verificarAuth, verificarAdministador} = require('../middlewares/autenticacion')

//Agregar una nota

router.post('/nueva-nota', verificarAuth,  async (req, res) => {
  //req, res para procesar todo lo que venga de este post
  //req va tener toda la solicitud que nosotros enviemos, del formulario con toda informacion de una nueva nota, enviamos datos, esos datos los recibe req
  const body = req.body;
  body.usuarioId = req.usuario._id;

  console.log(body);

  try {
    const notaDB = await Nota.create(body);
    res.status(200).json(notaDB)

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    }); //ha habido un error al procesar la información 
  }

});



router.get('/nota/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Nota.findOne({ _id });
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }

});
//Exoportacion de router

router.get('/nota', verificarAuth, async (req, res) => {
  const usuarioId = req.usuario._id;
  try {
    const notaDB = await Nota.find({usuarioId});
    res.json(notaDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});

//delete eliminar una nota
router.delete('/nota/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const notaDB = await Nota.findByIdAndDelete({ _id });
    if (!notaDB) {
      return res.status(400).json({
        mensaje: 'No se encontró el id indicado',
        error
      });
    }
    res.json(notaDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});


//delete eliminar una nota
router.put('/nota/:id', async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  try {
    const notaDB = await Nota.findByIdAndUpdate(_id, body, { new: true });
    if (!notaDB) {
      return res.status(400).json({
        mensaje: 'No se encontró el id indicado',
        error
      });
    }
    res.json(notaDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});


module.exports = router;