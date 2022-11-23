const express = require('express');
const bodyParser = require('body-parser');

const { productsRouter, salesRouter } = require('./route');

const app = express();

app.use(bodyParser.json());
app.use('/', productsRouter);
app.use('/', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
