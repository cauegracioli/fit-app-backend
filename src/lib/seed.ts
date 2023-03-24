import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const seedInfo = await prisma.user.create({
    data: {
      name: "Caue Gracioli",
      email: "caue.gracioli@email.com",
      password: "c7c8d1c458001c7c6d5f4e173c9eb75efb2a269f",
      infos: {
        create: {
          porcentagem: 15,
          createdAt: new Date(),
        },
      },
      perfil: {
        create: {
          altura: 173,
          nascimento: new Date("09/03/1997"),
          sexo: "M",
        },
      },
      treinos: {
        create: {
          nome: "Treino de peito",
          exercicios: {
            create: {
              nome: "Supino reto",
              peso_utilizado: 20,
              quantidade_repeticoes: 8,
              quantidade_series: 3,
            },
          },
        },
      },
    },
  });

  console.log(seedInfo);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
