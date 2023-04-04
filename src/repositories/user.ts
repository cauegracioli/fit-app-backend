import { User } from "@prisma/client";
import prisma from "../database/prisma";

export class UserRepository {
  async create(user: User): Promise<User> {
    return prisma.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: user.password,
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
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
