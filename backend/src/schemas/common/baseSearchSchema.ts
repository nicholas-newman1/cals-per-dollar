import { z } from "zod";

const baseSearchSchema = z.object({
  query: z.string().optional(),
  page: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val, 10)), {
      message: "Page must be a valid number",
    }),
  itemsPerPage: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val, 10)), {
      message: "ItemsPerPage must be a valid number",
    }),
});

export default baseSearchSchema;
