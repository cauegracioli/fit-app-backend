import { InfoRepository } from "../../repositories/info";
import { UserRepository } from "./../../repositories/user";

import { z } from "zod";

export async function createInfo(
  peso: number,
  porcentagem: number,
  user: string
) {
  const infoSchema = z.object({
    peso: z.number(),
    porcentagem: z.number(),
    user: z.string(),
  });

  const userRepo = new UserRepository();
  const infoRepo = new InfoRepository();

  const userExist = userRepo.findById(user);

  if (!userExist) throw new Error("Usuário não existe");

  const validated = infoSchema.safeParse({ peso, porcentagem, user });

  if (!validated.success)
    throw new Error("Paramêtros passados estão com formato incorreto");

  return infoRepo.create(peso, porcentagem, user);
}
