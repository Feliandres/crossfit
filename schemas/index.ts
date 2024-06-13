import * as z from "zod";

<<<<<<< HEAD
export const SettingsSchema = z.object({
    name: z.optional(z.string())
});

=======
>>>>>>> 9c41f12f419b04f98443bb68f6dea5672469a670
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minium 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});