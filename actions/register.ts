"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import {getUserByEmail} from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

// no es necesario se puede usar ruta api como esto
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "Invalid fields"};
    }

    const {email, password, name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password,10);

    /*
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        }
    });
    */

    // Para eso sirve la funcion getUserByEmail
    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {error: "Email already in use"};
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);

    // Implementar verificacion de email

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return {success: "Confirmation Email Sent"};
};