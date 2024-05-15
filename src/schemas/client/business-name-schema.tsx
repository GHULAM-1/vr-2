import { z } from "zod";
export const businessNameSchema = z.object({
  businessName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

});
