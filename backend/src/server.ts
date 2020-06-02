import express from 'express';

const app = express();

app.get('/', (request, response) => {
  console.log('Listagem de usuários');
  response.json({
    message: 'Hello World',
  });
});

app.listen(3333);
