require('dotenv').config();

const express = require('express');
const cors = require('cors');
const admin = require('sriracha');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

// Conectando banco de dados
require('./config/db.config');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// painel admin
app.use('/admin', admin());

// documentação
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Rotas

const user = require('./routes/user.routes');
const schedules = require('./routes/schedule.routes');

app.use('/', user);
app.use('/schedules', schedules);

// Exportar o app
module.exports = app;
