import { Prisma } from "@prisma/client";
import prisma from "../database/prisma";

class Perfil {
  async create(perfil: Prisma.PerfilCreateInput, id: string) {
    const userId = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (userId) {
      const perfilCreate = await prisma.perfil.create({
        data: {
          altura: perfil.altura,
          nascimento: perfil.nascimento,
          sexo: perfil.sexo,
          user: {
            connect: {
              id: userId.id,
            },
          },
        },
      });

      return perfilCreate;
    } else {
      throw Error(
        "Não foi possível inserir as informações de perfil. Tente novamente mais tarde."
      );
    }
  }
}

export default Perfil;
