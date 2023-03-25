import { Response } from "express";
import { Request } from "express";
import prisma from "../database/prisma";
import createPerfil from "../services/perfil/perfilCreate";

export async function perfilCreateController(
  request: Request,
  response: Response
) {
  const perfil = request.body;
  const { id } = request.params;

  try {
    const res = await createPerfil(perfil, id);

    console.log(res);

    if (!res.success) {
      return response.status(500).send(res);
    }

    return response.status(201).json(res);
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: "Erro ao tentar finalizar requisição",
    });
  } finally {
    await prisma.$disconnect();
  }
}
