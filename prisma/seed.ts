import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {

    // Creamos al usuario Admin
    const passwordAdmin = "123";
    const hashedPassword = await bcrypt.hashSync(passwordAdmin, 10);
    const admin = await prisma.user.upsert({
    where: {
        email: "admin@gmail.com",
    },
    create: {
        nombre: "Admin",
        apellido: "Usuario",
        email: "admin@gmail.com",
        password: hashedPassword,
        rol: "ADMIN",
    },
    update: {
        nombre: "Admin",
        apellido: "Usuario",
    },
    });

    console.log("Se ha creado el usuario Admin");
    console.log(admin);

    // Creamos al usuario Entrenador
    const passwordTrainer = "123";
    const hashedPasswordTrainer = await bcrypt.hashSync(passwordTrainer, 10);
    const trainer = await prisma.user.upsert({
    where: {
        email: "trainer@gmail.com",
    },
    create: {
        nombre: "trainer",
        apellido: "Usuario",
        email: "trainer@gmail.com",
        password: hashedPasswordTrainer,
        rol: "TRAINER",
    },
    update: {
        nombre: "Trainer",
        apellido: "Usuario",
    },
    });

    console.log("Se ha creado el usuario Entrenador");
    console.log(trainer);

    // Creamos los planes
    const plan1 = await prisma.plan.upsert({
    where: {
        nombre: "Plan Normal",
    },
    create: {
        nombre: "Plan Normal",
        descripcion: "Este plan tiene duracion de 30 días",
        valor: 30.0,
        duracion: 30,
    },
    update: {
        nombre: "Plan Normal",
        descripcion: "Este plan tiene duracion de 30 días",
    },
    });

    const plan2 = await prisma.plan.upsert({
    where: {
        nombre: "Plan Promocional",
    },
    create: {
        nombre: "Plan Promocional",
        descripcion: "Este plan tiene duracion de 90 días",
        valor: 70.0,
        duracion: 90,
    },
    update: {
        nombre: "Plan Promocional",
        descripcion: "Este plan tiene duracion de 90 días",
    },
    });

    console.log("Se ha creado 2 planes");
    console.log(plan1);
    console.log(plan2);

    // Creamos 3 miembros
    const member1 = await prisma.member.upsert({
    where: {
        email: "adrian@gmail.com",
    },
    create: {
        cedula: "1726258172",
        nombre: "Adrian",
        apellido: "Jacome",
        email: "adrian@gmail.com",
        telefono: "0982762512",
        telefonoEmergencia: "02245466236",
        fechaNacimiento: "2003-03-23T00:00:00Z",
        sexo: "M",
        direccion: "La Ofelia",
        nacionalidad: "Ecuatoriana",
        plan: { connect: { id: 1 } },
    },
    update: {
        nombre: "Adrian",
    },
    });

    const member2 = await prisma.member.upsert({
    where: {
        email: "juan.perez@gmail.com",
    },
    create: {
        cedula: "1724356251",
        nombre: "Juan",
        apellido: "Perez",
        email: "juan.perez@gmail.com",
        telefono: "0985662513",
        telefonoEmergencia: "02245444436",
        fechaNacimiento: "2001-07-14T00:00:00Z",
        sexo: "M",
        direccion: "Conocoto",
        nacionalidad: "Ecuatoriana",
        plan: { connect: { id: 1 } },
    },
    update: {
        nombre: "Juan",
    },
    });

    const member3 = await prisma.member.upsert({
    where: {
        email: "micaela.duran@gmail.com",
    },
    create: {
        cedula: "1726269172",
        nombre: "Micaela",
        apellido: "Duran",
        email: "micaela.duran@gmail.com",
        telefono: "0985662513",
        telefonoEmergencia: "022952553",
        fechaNacimiento: "2000-05-21T00:00:00Z",
        sexo: "M",
        direccion: "La Florida",
        nacionalidad: "Ecuatoriana",
        plan: { connect: { id: 1 } },
    },
    update: {
        nombre: "Micaela",
    },
    });

    console.log("Se ha creado 3 miembros");
    console.log(member1);
    console.log(member2);
    console.log(member3);

    return;
}
main()
    .then(async () => {
    await prisma.$disconnect();
    })
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
    });
