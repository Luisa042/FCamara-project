require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Conectando banco de dados
require('./config/db.config');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Rotas

const user = require('./routes/user.routes');

app.use('/', user);

// Exportar o app
module.exports = app;
