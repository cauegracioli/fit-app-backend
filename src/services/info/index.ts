import { InfoRepository } from "../../repositories/info";
import { UserRepository } from "./../../repositories/user";

import { z } from "zod";

export async function createInfo(
  peso: number,
  porcentagem: number,
  user: string
): Promise<void> {
  const infoSchema = z.object({
    peso: z.number(),
    porcentagem: z.number(),
    user: z.string(),
  });

  const userRepo = new UserRepository();
  const infoRepo = new InfoRepository();

  try {
    const userExist = await userRepo.findById(user);

    if (!userExist) {
      throw new Error("Usuário não existe");
    }

    const validated = infoSchema.safeParse({ peso, porcentagem, user });

    if (!validated.success) {
      throw new Error("Parâmetros passados estão com formato incorreto");
    }

    await infoRepo.create(
      validated.data.peso,
      validated.data.porcentagem,
      validated.data.user
    );
  } catch (error) {
    console.error(error);
    throw new Error("Ocorreu um erro ao criar informações");
  }
}
