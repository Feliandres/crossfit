import { NextResponse } from "next/server";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ResetSchema } from "@/schemas";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        // Validación con Zod
        const values = await req.json();
        const validatedFields = ResetSchema.safeParse(values);

        if (!validatedFields.success) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        const { email } = validatedFields.data;

        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return NextResponse.json({ error: "Email not found" }, { status: 404 });
        }

        const passwordResetToken = await generatePasswordResetToken(email);

        await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token,
        );

        return NextResponse.json({ success: "Reset email sent!" }, { status: 200 });

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Invalid fields", details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
}