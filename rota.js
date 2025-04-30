const apiUrlBase = 'http://localhost:3000/api/usuarios'; 
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const resultadoTextarea = document.getElementById('resultado');

async function adicionarUsuario() {
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  if (!nome || !email) {
    resultadoTextarea.value = 'ERRO: Por favor, insira NOME e EMAIL para adicionar um novo usuário.';
    return;
  }

  resultadoTextarea.value = `Adicionando novo usuário...
Nome: ${nome}
Email: ${email}`;

  try {
    const response = await fetch(apiUrlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome: nome, email: email }),
    });

    const data = await response.json().catch(err => {
        console.error("Erro ao parsear JSON da resposta POST:", err, response.status, response.statusText);
        return { erro: "Erro na resposta do servidor", detalhe: `Status ${response.status}: ${response.statusText}` };
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${data.erro || 'Falha ao adicionar usuário'} - ${data.detalhe || 'Verifique os dados ou se o email já existe.'}`);
    }
    resultadoTextarea.value = `SUCESSO: Usuário adicionado!
Nome: ${nome}
Email: ${email}

Mensagem da API: ${data.mensagem || 'Operação concluída.'}`;
    nomeInput.value = '';
    emailInput.value = '';

  } catch (error) {
    resultadoTextarea.value = `ERRO ao adicionar usuário: ${error.message}

Verifique se o email já está cadastrado ou se o servidor está respondendo corretamente.`;
  }
}

async function buscarUsuario() {
  const email = emailInput.value.trim();
  if (!email) {
    resultadoTextarea.value = 'ERRO: Por favor, insira o EMAIL do usuário para buscar.';
    return;
  }
  resultadoTextarea.value = `Buscando usuário com email: ${email}...`;
  try {
    const response = await fetch(apiUrlBase);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ erro: 'Erro desconhecido', detalhe: response.statusText }));
      throw new Error(`Erro ${response.status}: ${errorData.erro || 'Falha ao buscar'} - ${errorData.detalhe || ''}`);
    }
    const usuarios = await response.json();
    const usuarioEncontrado = usuarios.find(u => u.email === email);
    if (usuarioEncontrado) {
        resultadoTextarea.value = `Usuário encontrado:
Nome: ${usuarioEncontrado.nome}
Email: ${usuarioEncontrado.email}`;
    } else {
        resultadoTextarea.value = `Usuário com email "${email}" não encontrado.

Lista de todos usuários (simulados):
${JSON.stringify(usuarios, null, 2)}`;
    }
  } catch (error) {
    resultadoTextarea.value = `ERRO ao buscar usuário: ${error.message}

Verifique se o servidor está rodando e acessível.`;
  }
}

async function atualizarUsuario() {
  const email = emailInput.value.trim();
  const nome = nomeInput.value.trim();
  if (!email || !nome) {
    resultadoTextarea.value = 'ERRO: Por favor, insira o EMAIL do usuário que deseja atualizar e o NOVO NOME.';
    return;
  }
  resultadoTextarea.value = `Atualizando nome do usuário com email "${email}" para "${nome}"...`;
  try {
    const response = await fetch(`${apiUrlBase}/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome: nome }),
    });

    const data = await response.json().catch(err => {
        console.error("Erro ao parsear JSON da resposta PUT:", err, response.status, response.statusText);
        return { erro: "Erro na resposta do servidor", detalhe: `Status ${response.status}: ${response.statusText}` };
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${data.erro || 'Falha ao atualizar'} - ${data.detalhe || 'Verifique se o email existe.'}`);
    }

    resultadoTextarea.value = `SUCESSO: Usuário atualizado!
Email: ${email}
Novo Nome: ${nome}

Mensagem da API: ${data.mensagem || 'Operação concluída.'}`;

  } catch (error) {
    resultadoTextarea.value = `ERRO ao atualizar usuário: ${error.message}

Verifique se o email "${email}" existe e se o servidor está respondendo corretamente.`;
  }
}
async function deletarUsuario() {
  const email = emailInput.value.trim();
  if (!email) {
    resultadoTextarea.value = 'ERRO: Por favor, insira o EMAIL do usuário que deseja deletar.';
    return;
  }
  if (!confirm(`Tem certeza que deseja deletar o usuário com email "${email}"? O campo NOME não é usado nesta operação.`)) {
      resultadoTextarea.value = 'Operação de deleção cancelada.';
      return;
  }

  resultadoTextarea.value = `Deletando usuário com email: "${email}"...`;
  try {
    const response = await fetch(`${apiUrlBase}/${encodeURIComponent(email)}`, {
      method: 'DELETE',
    });

    const data = await response.json().catch(err => {
        console.error("Erro ao parsear JSON da resposta DELETE:", err, response.status, response.statusText);
        return { erro: "Erro na resposta do servidor", detalhe: `Status ${response.status}: ${response.statusText}` };
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${data.erro || 'Falha ao deletar'} - ${data.detalhe || 'Verifique se o email existe.'}`);
    }
    resultadoTextarea.value = `SUCESSO: Usuário com email "${email}" deletado!

Mensagem da API: ${data.mensagem || 'Operação concluída.'}`;
    nomeInput.value = '';
    emailInput.value = '';

  } catch (error) {
    resultadoTextarea.value = `ERRO ao deletar usuário: ${error.message}

Verifique se o email "${email}" existe e se o servidor está respondendo corretamente.`;
  }
}

