import express from 'express';
var router = express.Router();
import bibliotecariosController from '../controllers/bibliotecariosController.js';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let response = await bibliotecariosController.getAllBibliotecarios(req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

router.post('/', async function(req, res, next) {
  let response = await bibliotecariosController.addBibliotecario(req.body, req.get("Authorization"));
  res.status(response.code).json(response.payload);
});

export default router;
