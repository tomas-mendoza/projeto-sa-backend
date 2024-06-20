import Express, { Application } from "express";
import Database from "./config/database";

// const app = Express();

// app.use(Express.json());

// app.get('/', (req, res) => {
//   return res.json({
//     message: 'Ok'
//   });
// });

// export default app;
export default class App {
  public app: Application;
  public db: Database | undefined;

  constructor() {
    this.app = Express();
    this.routes();
    this.database();
  }

  protected routes() {
    this.app.get('/', (req, res) => {
      return res.json({
        status: 'ok'
      });
    });
  }

  protected database() {
    this.db = new Database();
  }
}
