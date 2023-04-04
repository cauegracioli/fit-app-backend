import { TreinoInterface } from "../../repositories/treino";
import { TreinoRepository } from "../../repositories/treino";
import { z } from "zod";
import { Prisma, Exercicio, Treino } from "@prisma/client";
import { ExercicioRepository } from "../../repositories/exercicio";

export class TreinoService extends TreinoRepository {
  constructor() {
    super();
  }

  async createTreino(treino: TreinoInterface): Promise<Treino> {
    const treinoSchema = z.object({
      nome: z.string(),
      user: z.string(),
      exercicios: z.array(
        z.object({
          nome: z.string(),
          metodo: z.string().nullable(),
          quantidade_series: z.number(),
          quantidade_repeticoes: z.number(),
          peso_utilizado: z.number(),
        })
      ),
    });

    if (treino.exercicios.length < 1)
      throw new Error("Para criar um treino, é necessário criar um exercício.");

    if (!treinoSchema.safeParse(treino).success)
      throw new Error("Os dados passados possuem o tipo incorreto.");

    try {
      const treinoAlreadyExistWithThisName = await this.findTreinoByName(
        treino.nome
      );

      if (treinoAlreadyExistWithThisName)
        throw new Error(
          "Um treino com o mesmo nome já existe. Crie um com um nome diferente."
        );

      return this.create(treino);
    } catch (err) {
      throw new Error("Ocorreu um erro ao tentar criar um treino");
    }
  }

  async addNewExercice(
    userId: string,
    treinoId: number,
    exercicios: Prisma.ExercicioCreateInput[]
  ): Promise<Exercicio[]> {
    const exercicioRepo = new ExercicioRepository();

    const exerciseSchema = z.object({
      userId: z.string(),
      treinoId: z.number(),
      exercicios: z.array(
        z.object({
          nome: z.string(),
          metodo: z.string().nullable(),
          quantidade_series: z.number(),
          quantidade_repeticoes: z.number(),
          peso_utilizado: z.number(),
        })
      ),
    });

    const validate = exerciseSchema.safeParse({ userId, treinoId, exercicios });

    if (!validate.success) {
      throw new Error("Os dados passados possuem um formato incorreto");
    }

    if (exercicios.length < 1) {
      throw new Error("Você precisa inserir ao menos 1 exercício");
    }

    try {
      const treinoExist = await this.findTreinoByIdAndUserId(
        validate.data.treinoId,
        validate.data.userId
      );

      if (!treinoExist) {
        throw new Error("Um treino com esse id não existe.");
      }

      const data = validate.data;

      return exercicioRepo.addNewExercice(data.treinoId, exercicios);
    } catch (error) {
      throw new Error("Ocorreu um erro ao tentar criar um exercício");
    }
  }
}
