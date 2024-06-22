import Express, { Application } from "express";
import Database from "./config/database";
import AdminRouter from "./routes/AdminRouter";
import TeacherRouter from "./routes/TeacherRouter";
import StudentRouter from "./routes/StudentRouter";

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
  }

  protected routes() {
    this.app.get('/', (req, res) => {
      return res.json({
        status: 'ok'
      });
    });
    this.app.use('/admins', AdminRouter);
    this.app.use('/teachers', TeacherRouter);
    this.app.use('/students', StudentRouter)
  }

  protected database() {
    this.db = new Database();
  }
}
