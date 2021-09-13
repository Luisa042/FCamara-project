const server = require('./src/app');

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
