import { z } from "zod";

const getByIdSchema = z.object({
  id: z.string().min(1),
});

export type GetByIdSchema = z.infer<typeof getByIdSchema>;

export default getByIdSchema;
