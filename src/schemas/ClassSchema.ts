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

export const UserClassSchema = z.object({
  body: z.object({
    classId: z.coerce.number(),
    userId: z.coerce.number()
  })
});

export const SubjectClassSchema = z.object({
  body: z.object({
    classId: z.coerce.number(),
    subjectId: z.coerce.number()
  })
});
