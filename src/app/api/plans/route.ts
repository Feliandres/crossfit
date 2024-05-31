import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request: NextRequest) {
    // Paginacion
    try {
    const skip = request.nextUrl.searchParams.get("skip");
    const take = request.nextUrl.searchParams.get("take");
    const plans = await prisma.plan.findMany({
        skip: skip ? parseInt(skip, 10) : undefined,
        take: take ? parseInt(take, 10) : undefined,
        orderBy: {
            id: 'asc',  // Ordenar por el campo 'id' en orden ascendente
        },
    });

    if (plans) {
        return new NextResponse(JSON.stringify({
            success: "Los planes se obtuvieron con éxito.",
            data: plans,
        }), { status: 201 });
    }

    }catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Error al obtener datos de los planes.", }),
            { status: 400 }
        );
    }
}


export async function POST(request: Request) {
    try {
    const json = await request.json();

    const newPlan = await prisma.plan.create({
    data: json,
    });

    if (newPlan) {
        return new NextResponse(JSON.stringify({
            success: "El plan se ha creado con éxito.",
            data: newPlan,
        }), { status: 201 });
    }

    }catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Verifique todos los campos. Por favor, inténtelo de nuevo.", }),
            { status: 400 }
        );
    }
}
