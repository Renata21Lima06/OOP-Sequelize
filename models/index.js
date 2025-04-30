// index.js
import { authenticate, sync, close } from './database.js';
import User from './models/Usuario.js';
//import { criar, listarTodos, atualizar } from './controllers/UserController.js';

//import { criar, listarTodos, atualizar, deletar } from './controllers/UserController.js';


import UserController from './controllers/UserController.js';

//const dao = UserController()



(async () => {
  try {
    await authenticate();
    console.log('Banco conectado com sucesso!');

    await sync(); // Cria a tabela se não existir

    // CREATE
    await UserController.criar('Maria Oliveira24', '24maria@email.com');

    // READ
    const lista = await UserController.listarTodos();
    console.log('Usuários:', lista);

    // UPDATE
    await UserController.atualizar('maria@email.com224', '224Maria Atualizada');

    // DELETE
    // await UserController.deletar('maria@email.com');

  } catch (err) {
    console.error('Erro:', err);
  } finally {
    await close();
  }
})();
