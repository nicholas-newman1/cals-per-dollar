import { z } from "zod";

const getTopCPDByRestaurantSchema = z.object({
  restaurantId: z.string().min(1),
});

export type GetTopCPDByRestaurantSchema = z.infer<
  typeof getTopCPDByRestaurantSchema
>;

export default getTopCPDByRestaurantSchema;
