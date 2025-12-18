import express from 'express';
var router = express.Router();
import autoresController from '../controllers/autoresController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await autoresController.getAllAutores();
  res.status(response.code).json(response.payload);
});

router.get('/:id', async function(req, res, next) {
  let response = await autoresController.getAutorByID(req.params.id);
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await autoresController.addAutor(req.body, req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

export default router;
