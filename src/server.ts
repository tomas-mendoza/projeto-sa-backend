import App from "./app";
import env from "./env";

(async () => {
  try {
    const app = new App().app;
    app.listen(env.API_PORT, () => {
      console.log(`The server is running on http://localhost:${env.API_PORT}`);
    })
  } catch(err: unknown) {
    console.error(err);
    process.exit(1);
  }
})();
