import { z } from 'zod';
import { config } from 'dotenv';
config();

const envSchema = z.object({
  API_PORT: z.coerce.number(),
  MYSQL_PORT: z.coerce.number(),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string()
});

export default envSchema.parse(process.env);