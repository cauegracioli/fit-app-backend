import { User } from "@prisma/client";
import prisma from "../database/prisma";

export class UserRepository {
  async create({ name, username, password }: User): Promise<User> {
    return prisma.user.create({
      data: {
        name,
        username,
        password,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { username },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { id },
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  async findAllUserData(username: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      include: {
        infos: true,
        perfil: true,
        treinos: {
          include: {
            exercicios: true,
          },
        },
      },
      where: { username },
    });

    if (user) {
      if ("password" in user) user["password"] = "undefined";
    }

    return user;
  }
}
