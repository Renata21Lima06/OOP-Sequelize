// Constantes globais para elementos da página e API
const apiUrlBase = 'http://localhost:3000/api/usuarios'; // URL base da API (ajuste se necessário)
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const resultadoTextarea = document.getElementById('resultado');

// Função para Adicionar Usuário (POST)
async function adicionarUsuario() {
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  // Validação: Nome e Email são necessários para adicionar
  if (!nome || !email) {
    resultadoTextarea.value = 'ERRO: Por favor, insira NOME e EMAIL para adicionar um novo usuário.';
    return;
  }

  resultadoTextarea.value = `Adicionando novo usuário...
Nome: ${nome}
Email: ${email}`;

  try {
    // Requisição POST para /api/usuarios
    const response = await fetch(apiUrlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Envia nome e email no corpo da requisição
      body: JSON.stringify({ nome: nome, email: email }),
    });

    // Tenta ler a resposta como JSON
    const data = await response.json().catch(err => {
        console.error("Erro ao parsear JSON da resposta POST:", err, response.status, response.statusText);
        return { erro: "Erro na resposta do servidor", detalhe: `Status ${response.status}: ${response.statusText}` };
    });

    // Verifica se a requisição foi bem-sucedida (status 201 Created)
    if (!response.ok) {
      // Lança erro com mensagem da API ou padrão
      throw new Error(`Erro ${response.status}: ${data.erro || 'Falha ao adicionar usuário'} - ${data.detalhe || 'Verifique os dados ou se o email já existe.'}`);
    }

    // Exibe mensagem de sucesso
    resultadoTextarea.value = `SUCESSO: Usuário adicionado!
Nome: ${nome}
Email: ${email}

Mensagem da API: ${data.mensagem || 'Operação concluída.'}`;
    // Limpa campos após adicionar com sucesso
    nomeInput.value = '';
    emailInput.value = '';

  } catch (error) {
    // Exibe mensagem de erro detalhada
    resultadoTextarea.value = `ERRO ao adicionar usuário: ${error.message}

Verifique se o email já está cadastrado ou se o servidor está respondendo corretamente.`;
  }
}


// Função para buscar usuário (GET)
// Nota: A API simulada busca todos. Filtramos aqui pelo email inserido.
async function buscarUsuario() {
  const email = emailInput.value.trim();
  if (!email) {
    resultadoTextarea.value = 'ERRO: Por favor, insira o EMAIL do usuário para buscar.';
    return;
  }
  resultadoTextarea.value = `Buscando usuário com email: ${email}...`;
  try {
    const response = await fetch(apiUrlBase); // Busca todos os usuários
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
        // Informa que o usuário específico não foi encontrado e mostra a lista completa
        resultadoTextarea.value = `Usuário com email "${email}" não encontrado.

Lista de todos usuários (simulados):
${JSON.stringify(usuarios, null, 2)}`;
    }
  } catch (error) {
    resultadoTextarea.value = `ERRO ao buscar usuário: ${error.message}

Verifique se o servidor está rodando e acessível.`;
  }
}

// Função para atualizar nome do usuário (PUT)
// Utiliza o EMAIL para identificar o usuário e o NOME como novo valor.
async function atualizarUsuario() {
  const email = emailInput.value.trim();
  const nome = nomeInput.value.trim();
  // Validação: Email e Nome são necessários para atualizar
  if (!email || !nome) {
    resultadoTextarea.value = 'ERRO: Por favor, insira o EMAIL do usuário que deseja atualizar e o NOVO NOME.';
    return;
  }
  resultadoTextarea.value = `Atualizando nome do usuário com email "${email}" para "${nome}"...`;
  try {
    // Requisição PUT para /api/usuarios/:email
    const response = await fetch(`${apiUrlBase}/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // Envia o novo nome no corpo da requisição
      body: JSON.stringify({ nome: nome }),
    });

    // Tenta ler a resposta como JSON, mesmo em caso de erro
    const data = await response.json().catch(err => {
        console.error("Erro ao parsear JSON da resposta PUT:", err, response.status, response.statusText);
        // Retorna um objeto de erro padrão se o JSON falhar
        return { erro: "Erro na resposta do servidor", detalhe: `Status ${response.status}: ${response.statusText}` };
    });

    // Verifica se a requisição foi bem-sucedida (status 2xx)
    if (!response.ok) {
      // Se não foi OK, lança um erro com a mensagem da API ou uma mensagem padrão
      throw new Error(`Erro ${response.status}: ${data.erro || 'Falha ao atualizar'} - ${data.detalhe || 'Verifique se o email existe.'}`);
    }

    // Exibe mensagem de sucesso
    resultadoTextarea.value = `SUCESSO: Usuário atualizado!
Email: ${email}
Novo Nome: ${nome}

Mensagem da API: ${data.mensagem || 'Operação concluída.'}`;

  } catch (error) {
    // Exibe mensagem de erro detalhada
    resultadoTextarea.value = `ERRO ao atualizar usuário: ${error.message}

Verifique se o email "${email}" existe e se o servidor está respondendo corretamente.`;
  }
}

// Função para deletar usuário (DELETE)
// Utiliza APENAS o EMAIL para identificar o usuário a ser deletado, conforme a API.
async function deletarUsuario() {
  const email = emailInput.value.trim();
  // Validação: Email é necessário para deletar
  if (!email) {
    resultadoTextarea.value = 'ERRO: Por favor, insira o EMAIL do usuário que deseja deletar.';
    return;
  }
  // Confirmação antes de deletar (recomendado)
  if (!confirm(`Tem certeza que deseja deletar o usuário com email "${email}"? O campo NOME não é usado nesta operação.`)) {
      resultadoTextarea.value = 'Operação de deleção cancelada.';
      return;
  }

  resultadoTextarea.value = `Deletando usuário com email: "${email}"...`;
  try {
    // Requisição DELETE para /api/usuarios/:email
    // O campo 'nome' não é utilizado nesta operação pela API.
    const response = await fetch(`${apiUrlBase}/${encodeURIComponent(email)}`, {
      method: 'DELETE',
    });

    // Tenta ler a resposta como JSON, mesmo em caso de erro
    const data = await response.json().catch(err => {
        console.error("Erro ao parsear JSON da resposta DELETE:", err, response.status, response.statusText);
         // Retorna um objeto de erro padrão se o JSON falhar
        return { erro: "Erro na resposta do servidor", detalhe: `Status ${response.status}: ${response.statusText}` };
    });

    // Verifica se a requisição foi bem-sucedida (status 2xx)
    if (!response.ok) {
       // Se não foi OK, lança um erro com a mensagem da API ou uma mensagem padrão
      throw new Error(`Erro ${response.status}: ${data.erro || 'Falha ao deletar'} - ${data.detalhe || 'Verifique se o email existe.'}`);
    }

    // Exibe mensagem de sucesso
    resultadoTextarea.value = `SUCESSO: Usuário com email "${email}" deletado!

Mensagem da API: ${data.mensagem || 'Operação concluída.'}`;
    // Limpa os campos após deletar com sucesso
    nomeInput.value = '';
    emailInput.value = '';

  } catch (error) {
     // Exibe mensagem de erro detalhada
    resultadoTextarea.value = `ERRO ao deletar usuário: ${error.message}

Verifique se o email "${email}" existe e se o servidor está respondendo corretamente.`;
  }
}

