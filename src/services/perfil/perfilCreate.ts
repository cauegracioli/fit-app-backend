import { Prisma } from "@prisma/client";
import { z } from "zod";
import PerfilRepository from "../../repositories/perfil";
import { Perfil } from "@prisma/client";

export default async function createPerfil(
  perfil: Prisma.PerfilCreateInput,
  id: string
): Promise<{ success: boolean; perfilCreated: Perfil }> {
  const perfilRepo = new PerfilRepository();
  const perfilSchema = z.object({
    altura: z.number(),
    nascimento: z.string(),
    sexo: z.enum(["M", "F"]),
  });

  try {
    const validate = perfilSchema.safeParse(perfil);

    if (!validate.success) {
      throw new Error("Formato dos dados estão incorretos");
    }

    const perfilCreated = await perfilRepo.create(perfil, id);

    return { success: true, perfilCreated };
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar criar um perfil");
  }
}
