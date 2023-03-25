import { Prisma } from "@prisma/client";
import prisma from "../database/prisma";

class UserRepository {
  prisma: any;
  constructor() {
    this.prisma = prisma.user;
  }

  async create(user: Prisma.UserCreateManyInput) {
    return this.prisma.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.findUnique({
      where: { email },
    });
  }

  async delete(id: number) {
    return this.prisma.delete({
      where: { id },
    });
  }
}

export default UserRepository;
