import express from 'express';
var router = express.Router();
import editorasController from '../controllers/editorasController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await editorasController.getAllEditoras(req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

router.get('/:id', async function(req, res, next) {
  let response = await editorasController.getEditoraByID(req.params.id);
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await editorasController.addEditora(req.body, req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

export default router;
