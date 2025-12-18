import express from 'express';
var router = express.Router();
import usersController from '../controllers/usersController.js';

router.post('/', function(req, res, next) {
  usersController.criarUsuarioFirebase(req.body.email, req.body.password)
    .then((resposta) => res.status(201).send(resposta))
    .catch((erro) => res.status(500).send(erro))
});

router.post('/login', function(req, res, next) {
  usersController.fazerLoginFirebase(req.body.email, req.body.password)
    .then((resposta) => res.status(200).send(resposta))
    .catch((erro) => {
      console.log(erro);
      
      res.status(401).send(erro)
    })
});

export default router;
