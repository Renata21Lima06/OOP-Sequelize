import express, { json } from 'express';
const app = express();
import sequelize from './database.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

//app.use(cors());

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));




app.use(json());
app.use('/api', userRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco com sucesso!');
    await sequelize.sync(); // Garante que a tabela será criada
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
  }
})();

export default app;
