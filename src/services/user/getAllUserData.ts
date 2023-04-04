import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/user";
import { z } from "zod";

export class GetAllUserData extends UserRepository {
  constructor() {
    super();
  }

  async findAllUserDataService(username: string) {
    const usernameSchema = z.string();

    if (!usernameSchema.safeParse(username).success) {
      throw new Error("O username deve ser uma string");
    }

    if (!username) {
      throw new Error("O username está vazio, informe um para continuar");
    }

    return this.findAllUserData(username);
  }
}
