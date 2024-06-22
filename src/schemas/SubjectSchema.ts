import { z } from "zod";

export const SubjectSchema = z.object({
  name: z.string()
});

export const createSubjectSchema = z.object({
  body: SubjectSchema
});

export const updateSubjectSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  }),
  body: SubjectSchema
});
