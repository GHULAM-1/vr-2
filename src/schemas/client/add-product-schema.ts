import { z } from "zod";
export const addProductSchema = z.object({
  productName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  productDesc: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  productPrice: z.string(),
  isVR: z.enum(["yes", "no"], {
    required_error: "You need to select a notification type.",
  }),
});
