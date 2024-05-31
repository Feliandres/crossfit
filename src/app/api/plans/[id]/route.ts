import { NextResponse } from 'next/server';
import {prisma} from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);

        if (isNaN(id)) {
            return new NextResponse(
                JSON.stringify({ error: "ID inválido. Por favor, proporcione un ID válido." }),
                { status: 400 }
            );
        }

        const getPlan = await prisma.plan.findUnique({
            where: {
                id: id,
            },
        });

        if (getPlan) {
            return new NextResponse(
                JSON.stringify({
                    success: "El plan se ha encontrado con éxito.",
                    data: getPlan,
                }),
                { status: 200 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ error: "El plan con el ID proporcionado no existe." }),
                { status: 404 }
            );
        }

    } catch (error) {
        console.error('Error encontrando el plan:', error);
        return new NextResponse(
            JSON.stringify({ error: "Ocurrió un error al encontrar el plan. Por favor, inténtelo de nuevo." }),
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);

        if (isNaN(id)) {
            return new NextResponse(
                JSON.stringify({ error: "ID inválido. Por favor, proporcione un ID válido." }),
                { status: 400 }
            );
        }

        const json = await request.json();

        const updatePlan = await prisma.plan.update({
            where: {
                id: id
            },
            data: {
                nombre: json.nombre,
                descripcion: json.descripcion,
                valor: json.valor,
                duracion: json.duracion,
                estado: json.estado
            }
        });

        return new NextResponse(
            JSON.stringify({
                success: "El plan se ha actualizado con éxito.",
                data: updatePlan,
            }),
            { status: 200 }
        );

    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return new NextResponse(
                JSON.stringify({ error: "El plan con el ID proporcionado no existe." }),
                { status: 404 }
            );
        }

        console.error('Error actualizando el plan:', error);
        return new NextResponse(
            JSON.stringify({ error: "Ocurrió un error al actualizar el plan. Por favor, inténtelo de nuevo." }),
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);

        if (isNaN(id)) {
            return new NextResponse(
                JSON.stringify({ error: "ID inválido. Por favor, proporcione un ID válido." }),
                { status: 400 }
            );
        }

        const desactivatePlan = await prisma.plan.update({
            where: {
                id: id
            },
            data: {
                estado: false
            }
        });

        return new NextResponse(
            JSON.stringify({
                success: "El plan se ha desactivado con éxito.",
                data: desactivatePlan,
            }),
            { status: 200 }
        );

    } catch (error) {
        if (error instanceof prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return new NextResponse(
                JSON.stringify({ error: "El plan con el ID proporcionado no existe." }),
                { status: 404 }
            );
        }

        console.error('Error desactivando el plan:', error);
        return new NextResponse(
            JSON.stringify({ error: "Ocurrió un error al desactivar el plan. Por favor, inténtelo de nuevo." }),
            { status: 500 }
        );
    }
}