import { Exercicio, Prisma } from "@prisma/client";
import prisma from "../database/prisma";

export class ExercicioRepository {
  async addNewExercice(
    userId: string,
    treinoId: number,
    exercicios: Array<Prisma.ExercicioCreateInput>
  ): Promise<Exercicio[]> {
    const newExercices = await prisma.$transaction(async (transaction) => {
      const exercicioCreations = exercicios.map((exercicio) => {
        const {
          nome,
          metodo,
          quantidade_series,
          quantidade_repeticoes,
          peso_utilizado,
        } = exercicio;

        return transaction.exercicio.create({
          data: {
            nome,
            metodo,
            quantidade_series,
            quantidade_repeticoes,
            peso_utilizado,
            treino: {
              connect: {
                id: treinoId,
              },
            },
          },
        });
      });

      return await Promise.all(exercicioCreations);
    });

    return newExercices;
  }
}
