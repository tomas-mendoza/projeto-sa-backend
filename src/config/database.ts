import { Sequelize } from 'sequelize-typescript';
import env from '../env';
import Class from '../models/Class';
import User from '../models/User';

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: env.DATABASE_NAME,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  port: env.MYSQL_PORT,
  host: env.DATABASE_HOST,
  models: [User, Class]
});

export default sequelize;
