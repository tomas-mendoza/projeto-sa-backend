import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string(),
    cpf: z.string(),
    birthdate: z.string(),
    password: z.string()
  })
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  }),
  body: z.object({
    name: z.string(),
    cpf: z.string(),
    birthdate: z.string(),
    password: z.string().optional()
  })
});
