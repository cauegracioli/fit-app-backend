import { Exercicio, Treino } from "@prisma/client";
import prisma from "../database/prisma";

export interface TreinoInterface {
  nome: string;
  user: string;
  exercicios: [
    {
      nome: string;
      metodo: string;
      quantidade_series: number;
      quantidade_repeticoes: number;
      peso_utilizado: number;
    }
  ];
}

export class TreinoRepository {
  protected async create(data: TreinoInterface): Promise<Treino> {
    const { user, nome, exercicios } = data;

    const treino = await prisma.$transaction(async (transaction) => {
      const createdTreino = await transaction.treino.create({
        data: { userId: user, nome },
      });

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
            treinoId: createdTreino.id,
          },
        });
      });

      await Promise.all(exercicioCreations);

      return createdTreino;
    });

    return treino;
  }

  async findTreinoByName(nome: string): Promise<Treino | null> {
    return prisma.treino.findFirst({
      where: {
        nome,
      },
      include: {
        exercicios: true,
      },
    });
  }
}
