// models/User.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

class User extends Model {}

User.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;
