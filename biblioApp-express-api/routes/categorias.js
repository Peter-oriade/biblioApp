import express from 'express';
var router = express.Router();
import categoriasController from '../controllers/categoriasController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await categoriasController.getAllCategorias(req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

router.get('/:id', async function(req, res, next) {
  let response = await categoriasController.getCategoriaByID(req.params.id);
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await categoriasController.addCategoria(req.body, req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

export default router;
