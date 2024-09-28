import { z } from "zod";

const searchMenuItemsSchema = z.object({
  query: z.string(),
  restaurant: z.string().optional(),
});

export type SearchMenuItemsSchema = z.infer<typeof searchMenuItemsSchema>;

export default searchMenuItemsSchema;
