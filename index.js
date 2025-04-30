// index.js
import { authenticate, sync, close } from './database.js';
import User from './models/Usuario.js';
//import { criar, listarTodos, atualizar } from './controllers/UserController.js';

//import { criar, listarTodos, atualizar, deletar } from './controllers/UserController.js';

import UserController from './controllers/UserController.js';

(async () => {
  try {
    await authenticate();
    console.log('Banco conectado com sucesso!');

    await sync(); 
    await UserController.criar('Marcos Lima2', '2marcos@email.com');
    const lista = await UserController.listarTodos();
    console.log('Usuários:', lista);
    await UserController.atualizar('marco@email.com', '2Marcos Atualizada');

  } catch (err) {
    console.error('Erro:', err);
  } finally {
    await close();
  }
})();
