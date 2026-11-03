import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập username.")
    .max(100, "Username không được quá 100 ký tự.")
    .regex(/^[A-Za-z0-9._@-]+$/, "Username chứa ký tự không hợp lệ."),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu.")
    .max(200, "Mật khẩu không được quá 200 ký tự."),
});

export const registerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Tên hiển thị cần có ít nhất 2 ký tự.")
    .max(60, "Tên hiển thị không được quá 60 ký tự."),
  email: z.email("Email không hợp lệ."),
  password: z.string().min(6, "Mật khẩu cần có ít nhất 6 ký tự."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
