<h1 align="center" >OOP-Sequilize</h1>

Estudo da aula de Desenvolvimento Web II - Utilização de sequelize para Banco de dados

## Informações principais

Desenvolvido por:
  - Alice Silva -> 
    - :books: Github Institucional https://github.com/AliceLSP </li>
    - :pushpin: Github Profissional https://github.com/Alicelspires </li>
  - Matheus Ciriaco ->
    - :pushpin: Github  https://github.com/MSCiriaco81
<br>

## Preview

![image](https://github.com/user-attachments/assets/d5f6dcbe-1123-43fa-ae95-3a6afe252f5d)


## Como testar o sistema

1. Clone o repositorio em seu Editor de código

```bash
  git clone https://github.com/MSCiriaco81/OOP-SEQUILIZE.git
```

2. Configure as credencias de acordo com as informações do seu MySQL

```js
const sequelize = new Sequelize('fatecdiadema', 'root', 'senha', { // -> adicione o nome do banco, usuário e senha 
  host: 'localhost',
  dialect: 'mysql',
});
```

4. Inicie o Sistema

```bash
node server.js
```

5. Com uma extensão, como LiveServer, ou diretamente nas configurações, abra a pagina index.html no seu navegador
