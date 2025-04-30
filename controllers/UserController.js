// controllers/UserController.js
import User from '../models/Usuario.js'; 

class UserController {
  async criar(nome, email) {
    const usuario = await User.create({ nome, email });
    console.log('Usuário criado:', usuario.toJSON());
  }

  async listarTodos() {
    const usuarios = await User.findAll();
    return usuarios.map(u => u.toJSON());
  }

  async atualizar(emailAntigo, novoNome) {
    await User.update({ nome: novoNome }, {
      where: { email: emailAntigo },
    });
    console.log('Usuário atualizado.');
  }

  async deletar(email) {
    await User.destroy({ where: { email } });
    console.log('Usuário deletado.');
  }
}

export default new UserController();
