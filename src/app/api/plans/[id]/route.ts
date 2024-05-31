import { NextResponse } from 'next/server';
import {prisma} from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
    const id = params.id
    const getPlan = await prisma.plan.findUnique({
    where: {
        id: parseInt(id, 10)
    }
    })
    if (getPlan) {
        return new NextResponse(JSON.stringify({
            success: "El plan se ha encontrado con éxito.",
            data: getPlan,
        }), { status: 201 });
    }

    }catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "El plan o ID no se encuentran. Por favor, inténtelo de nuevo.", }),
            { status: 400 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
    const id = params.id
    const json = await request.json()

    const updatePlan = await prisma.plan.update({
    where: {
        id: parseInt(id, 10)
    },
    data: {
        nombre: json.nombre,
        descripcion: json.descripcion,
        valor: json.valor,
        duracion: json.duracion,
        estado: json.estado
    }
    })

    if (updatePlan) {
        return new NextResponse(JSON.stringify({
            success: "El plan se ha actualizado con éxito.",
            data: updatePlan,
        }), { status: 201 });
    }

    }catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Verifique todos los campos. Por favor, inténtelo de nuevo.", }),
            { status: 400 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
    const id = params.id

    const desactivatePlan = await prisma.plan.update({
    where: {
        id: parseInt(id, 10)
    },
    data: {
        estado: false
    }
    })

    if (desactivatePlan) {
        return new NextResponse(JSON.stringify({
            success: "El plan se ha desactivado con éxito.",
            data: desactivatePlan,
        }), { status: 201 });
    }

    }catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "El plan o ID no existen. Por favor, inténtelo de nuevo.", }),
            { status: 400 }
        );
    }
}