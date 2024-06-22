import { z } from "zod";

export const ClassSchema = z.object({
  name: z.string()
});

export const createClassSchema = z.object({
  body: ClassSchema
});

export const updateClassSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  }),
  body: ClassSchema
});
