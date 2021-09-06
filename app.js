require('dotenv').config();

const express = require('express');
const cors = require('cors');
const admin = require('sriracha');

// Connect Database
require('./config/db.config');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// adiciona painel admin na rota '/admin'
app.use('/admin', admin());

require('./controllers/authController')(app);

// Rotas
app.get('/', (req, res) => {
  res.send('ok');
});

// Exportar o app
module.exports = app;
