import fastify from "./app";
import sequelize from "./config/database";
import env from "./env";

(async () => {
  try {
    await fastify.listen({ port: env.API_PORT });
    console.log(`The server is running on http://localhost:${env.API_PORT}`);
    await sequelize.authenticate();
    console.log('The database has been started successfully!');
  } catch(err: unknown) {
    console.error(err);
    process.exit(1);
  }
})();
