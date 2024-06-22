import { z } from "zod";

export const createTokenSchema = z.object({
  body: z.object({
    cpf: z.string(),
    password: z.string()
  })
});
