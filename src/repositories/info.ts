import prisma from "../database/prisma";

export class InfoRepository {
  async create(peso: number, porcentagem: number, user: string) {
    const info = await prisma.$transaction(async (transaction) => {
      return transaction.info.create({
        data: {
          peso,
          porcentagem,
          user: {
            connect: {
              id: user,
            },
          },
        },
      });
    });

    return info;
  }
}
