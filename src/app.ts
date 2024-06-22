import Express, { Application } from "express";
import Database from "./config/database";
import CookieParser from 'cookie-parser';
import AdminRouter from "./routes/AdminRouter";
import TeacherRouter from "./routes/TeacherRouter";
import StudentRouter from "./routes/StudentRouter";
import TokenRouter from "./routes/TokenRouter";
import ClassRouter from "./routes/ClassRouter";

export default class App {
  public app: Application;
  public db: Database | undefined;

  constructor() {
    this.app = Express();
    this.plugins();
    this.routes();
    this.database();
  }

  protected plugins() {
    this.app.use(Express.json());
    this.app.use(CookieParser());
  }

  protected routes() {
    this.app.get('/', (req, res) => {
      return res.json({
        status: 'ok'
      });
    });
    this.app.use('/admins', AdminRouter);
    this.app.use('/teachers', TeacherRouter);
    this.app.use('/students', StudentRouter);
    this.app.use('/classes', ClassRouter);
    this.app.use('/auth', TokenRouter);
  }

  protected database() {
    this.db = new Database();
  }
}
