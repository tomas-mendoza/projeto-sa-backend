import { z } from "zod";

export const DeleteSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  })
});
