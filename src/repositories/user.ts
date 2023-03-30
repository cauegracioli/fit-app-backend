import { User } from "@prisma/client";
import prisma from "../database/prisma";

export class UserRepository {
  protected async create(user: User): Promise<User> {
    return prisma.user.create({
      data: {
        name: user.name,
        username: user.username,
        password: user.password,
      },
    });
  }

  public async findByEmail(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  protected async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
