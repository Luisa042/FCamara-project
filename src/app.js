require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Conectando banco de dados
require('./config/db.config');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// Rotas publicas

const user = require('./routes/user.routes');
const schedules = require('./routes/schedule.routes');

app.use('/', user);

// Rotas privadas que precisam de jwt (token)

const authMiddleware = require('./middlewares/auth.middleware');

app.use(authMiddleware);

app.use('/schedules', schedules);

// Exportar o app
module.exports = app;
