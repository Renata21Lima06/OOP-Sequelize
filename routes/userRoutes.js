import express from 'express';
const router = express.Router();
import userController from '../controllers/UserController.js';

router.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    try {
      await userController.criar(nome, email);
      res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: err.message });
    }
  });
  
  router.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await userController.listarTodos();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: err.message });
    }
  });
  
  router.put('/usuarios/:email', async (req, res) => {
    const { email } = req.params;
    const { nome } = req.body;
    try {
      await userController.atualizar(email, nome);
      res.json({ mensagem: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhe: err.message });
    }
  });
  
  router.delete('/usuarios/:email', async (req, res) => {
    const { email } = req.params;
    try {
      await userController.deletar(email);
      res.json({ mensagem: 'Usuário deletado com sucesso!' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar usuário', detalhe: err.message });
    }
  });
  
  export default router;
