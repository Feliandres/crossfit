import bcrypt from "bcrypt"; // Importa bcrypt
import { signIn } from "next-auth/react"; // Asegúrate de importar desde next-auth/react
import { LoginSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function POST(req: Request) {
    try {
        const validatedFields = LoginSchema.parse(await req.json());
        console.log("Campos validados:", validatedFields);

        const { email, password } = validatedFields;
        const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return NextResponse.json({ error: "Email does not exist" }, { status: 404 });
        }

        if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email);
            await sendVerificationEmail(verificationToken.email, verificationToken.token);
            return NextResponse.json({ success: "Confirmation email sent" }, { status: 200 });
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({
            success: "Login Sucessfully",
            user: {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
                role: existingUser.role,
                image: existingUser.image,
                // Include any other user fields you want to return
            },
        }, { status: 200 });

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Invalid fields", details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
}