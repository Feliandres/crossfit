import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        // Paginación
        const skip = request.nextUrl.searchParams.get("skip");
        const take = request.nextUrl.searchParams.get("take");

        const plans = await prisma.plan.findMany({
            skip: skip ? parseInt(skip, 10) : undefined,
            take: take ? parseInt(take, 10) : undefined,
            orderBy: {
                id: 'asc',  // Ordenar por el campo 'id' en orden ascendente
            },
        });

        return new NextResponse(
            JSON.stringify({
                success: "Los planes se obtuvieron con éxito.",
                data: plans,
            }),
            { status: 200 }
        );

    } catch (error) {
        console.error('Error al obtener datos de los planes:', error);

        return new NextResponse(
            JSON.stringify({ error: "Ocurrió un error al obtener los datos de los planes. Por favor, inténtelo de nuevo." }),
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();

        // Validar los campos necesarios aquí si es necesario
        if (!json.nombre || !json.descripcion || !json.valor || !json.duracion === undefined) {
            return new NextResponse(
                JSON.stringify({ error: "Todos los campos son requeridos. Por favor, verifique los datos enviados." }),
                { status: 400 }
            );
        }

        const newPlan = await prisma.plan.create({
            data: json,
        });

        return new NextResponse(
            JSON.stringify({
                success: "El plan se ha creado con éxito.",
                data: newPlan,
            }),
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creando el plan:', error);

        return new NextResponse(
            JSON.stringify({ error: "Ocurrió un error al crear el plan. Por favor, inténtelo de nuevo." }),
            { status: 500 }
        );
    }
}
