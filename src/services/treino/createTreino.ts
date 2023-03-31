import { TreinoInterface } from "./../../repositories/treino";
import { TreinoRepository } from "../../repositories/treino";
import { z } from "zod";

export class TreinoService extends TreinoRepository {
  constructor() {
    super();
  }

  async createTreino(treino: TreinoInterface) {
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

    const treinoAlreadyExistWithThisName = await this.findTreinoByName(
      treino.nome
    );

    if (treinoAlreadyExistWithThisName)
      throw new Error(
        "Um treino com o mesmo nome já existe. Crie um com um nome diferente."
      );

    return this.create(treino);
  }
}
