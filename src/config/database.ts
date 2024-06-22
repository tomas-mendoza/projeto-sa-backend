import { Sequelize } from 'sequelize-typescript';
import env from '../env';
import Class from '../models/Class';
import User from '../models/User';
import Subject from '../models/Subject';
import ClassUser from '../models/ClassUser';
import ClassSubject from '../models/ClassSubject';

export default class Database {
  public connection: Sequelize | undefined;

  constructor() {
    this.connection = new Sequelize({
      dialect: 'mysql',
      database: env.DATABASE_NAME,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      port: env.MYSQL_PORT,
      host: env.DATABASE_HOST,
      models: [User, Class, Subject, ClassUser, ClassSubject]
    });

    this.connection.authenticate().then(() => {
      console.log('The database connection has been estabilished successfully!');
      if(this.connection) {
        this.connection.sync().then(() => {
          User.findOne({ where: {
            name: 'admin'
          }}).then((admin) => {
            if(!admin) {
              User.create({
                name: 'admin',
                password: 'admin',
                birthdate: new Date().toISOString(),
                cpf: '11111111111',
                permission_level: 0
              }).then(() => {
                console.log('The database has been synced');
              });
            }
          });
        });
      }
    });
  }
}
