import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import indexRouter from './routes/index.js';
import clientesRouter from './routes/clientes.js';
import bibliotecariosRouter from './routes/bibliotecarios.js';
import categoriasRouter from './routes/categorias.js';
import autoresRouter from './routes/autores.js';
import editorasRouter from './routes/editoras.js';
import livrosRouter from './routes/livros.js';
import emprestimosRouter from './routes/emprestimos.js';
import usersRouter from './routes/users.js';

var app = express();

app.use(cors({
  origin: ['http://localhost:9000', 'https://biblioapp-quasar-front.onrender.com'],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clientes', clientesRouter);
app.use('/bibliotecarios', bibliotecariosRouter);
app.use('/categorias', categoriasRouter);
app.use('/autores', autoresRouter);
app.use('/editoras', editorasRouter);
app.use('/livros', livrosRouter);
app.use('/emprestimos', emprestimosRouter);
app.use('/users', usersRouter);

export default app;