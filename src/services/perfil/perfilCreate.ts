import { Prisma } from "@prisma/client";
import { z } from "zod";
import Perfil from "../../repositories/perfil";

export default async function createPerfil(
  perfil: Prisma.PerfilCreateInput,
  id: string
) {
  const perfilRepo = new Perfil();
  const perfilSchema = z.object({
    altura: z.number(),
    nascimento: z.string(),
    sexo: z.enum(["M", "F"]),
  });

  const validate = perfilSchema.safeParse(perfil);

  if (!validate.success) {
    return {
      success: false,
      message: "Formato dos dados inseridos estão incorretos",
      path: validate.error.issues[0].path,
    };
  }

  const perfilCreated = await perfilRepo.create(perfil, id);

  return { success: true, perfilCreated };
}
