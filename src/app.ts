import Express, { Application } from "express";
import Database from "./config/database";
import CookieParser from 'cookie-parser';
import cors from 'cors';
import AdminRouter from "./routes/AdminRouter";
import TeacherRouter from "./routes/TeacherRouter";
import StudentRouter from "./routes/StudentRouter";
import TokenRouter from "./routes/TokenRouter";
import ClassRouter from "./routes/ClassRouter";
import SubjectRouter from "./routes/SubjectRouter";
import env from "./env";

const options: cors.CorsOptions = {
  origin: [env.FRONTEND_URL],
  credentials: true
};

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
    this.app.use(cors(options));
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
    this.app.use('/subjects', SubjectRouter);
    this.app.use('/auth', TokenRouter);
  }

  protected database() {
    this.db = new Database();
  }
}
