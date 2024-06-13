import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { SettingsSchema } from "@/schemas";

export async function PUT (req: Request) {

    const editProfile = SettingsSchema.parse(await req.json());

    const user = await currentUser();

    if (!user || !user.id) {
        return NextResponse.json({ error: "Unauthorized"})
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser || !dbUser.id) {
        return NextResponse.json({ error: "Unauthorized"});
    }

    await prisma.user.update({
        where: { id: dbUser?.id},
        data: {
            ...editProfile,
        }
    });

    return NextResponse.json( { success: "Settings Updated"})

}