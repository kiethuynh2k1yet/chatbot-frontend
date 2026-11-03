import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Tin nhắn không được để trống.")
    .max(4000, "Tin nhắn không được dài quá 4.000 ký tự."),
});
