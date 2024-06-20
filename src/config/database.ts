import { Sequelize } from 'sequelize-typescript';
import env from '../env';

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: env.DATABASE_NAME,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  port: env.MYSQL_PORT,
  host: env.DATABASE_HOST
});

export default sequelize;
