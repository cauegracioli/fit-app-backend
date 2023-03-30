import { Prisma, User } from "@prisma/client";
import { z } from "zod";
import { UserRepository } from "../../repositories/user";
const bcrypt = require("bcrypt");
class UserCreateService extends UserRepository {
  constructor() {
    super();
  }
  async create(user: Prisma.UserCreateManyInput): Promise<User> {
    const userSchema = z.object({
      name: z.string(),
      password: z.string(),
      email: z.string(),
    });

    if (!userSchema.safeParse(user).success) {
      throw new Error("E-mail ou senha incorretos");
    }

    if (await this.findByEmail(user.email)) {
      throw new Error("E-mail ou senha incorretos");
    }

    const pdwHashed = await bcrypt.hash(user.password, 10);

    const userData: User = {
      name: user.name,
      email: user.email,
      password: pdwHashed,
      id: "",
      role: null,
      createdAt: null,
    };

    return this.create(userData);
  }
}

export default UserCreateService;
