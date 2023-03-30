import { User } from "@prisma/client";
import prisma from "../database/prisma";

export class UserRepository {
  async create(user: User): Promise<User> {
    return prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
