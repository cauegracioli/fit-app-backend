import { Prisma } from "@prisma/client";
import { z } from "zod";
import UserRepository from "../repositories/user";
const bcrypt = require("bcrypt");

class UserCreateService {
  async create(user: Prisma.UserCreateManyInput) {
    const userRepo = new UserRepository();

    const userSchema = z.object({
      name: z.string(),
      password: z.string(),
      email: z.string(),
    });

    if (!userSchema.safeParse(user).success) {
      return { success: false, error: "Dados inseridos no formato incorreto" };
    }

    if (await userRepo.findByEmail(user.email)) {
      return { success: false, error: "Usuário já existe" };
    }

    const pdwHashed = await bcrypt.hash(user.password, 10);

    return userRepo.create({
      name: user.name,
      email: user.email,
      password: pdwHashed,
    });
  }
}

export default UserCreateService;
