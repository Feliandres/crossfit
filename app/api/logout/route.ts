import { signOut } from "@/auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    
    try {
        await signOut({ redirect: true, redirectTo: '/auth/login' }); // Ensure this is a server action
        return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error logging out" }, { status: 500 });
    }
}