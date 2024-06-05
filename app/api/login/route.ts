import bcrypt from 'bcryptjs';
import { NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import { loginUserSchema } from "@/lib/user-schema";
import { generateVerificationToken } from "@/lib/tokens";
import { ZodError } from "zod";

export async function POST(req: Request){
    try {
        const {email, password} = loginUserSchema.parse(await req.json());

        if(!email || !password) {
            return NextResponse.json(
                {
                status: "fail",
                message: "invalid credentials",
                },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });


        if (!user ||!(await bcrypt.compare(String(password), user.password!))) {
            return NextResponse.json(
                {
                status: "fail",
                message: "Invalid credentials",
                },
                { status: 409 }
            );
        }

        if (!user.emailVerified) {
            const verificationToken = await generateVerificationToken(user.email);

            return {success: "Confirmation email sent"}
        }

        return NextResponse.json({
            ...user
        })

    } catch (error: any) {
        if (error instanceof ZodError) {
        return NextResponse.json(
            {
            status: "error",
            message: "Validation failed",
            errors: error.errors,
            },
            { status: 400 }
        );
        }

        if (error.code === "P2002") {
        return NextResponse.json(
            {
            status: "fail",
            message: "user with that email already exists",
            },
            { status: 409 }
        );
        }

        return NextResponse.json(
        {
            status: "error",
            message: error.message || "Internal Server Error",
        },
        { status: 500 }
        );
    }
}