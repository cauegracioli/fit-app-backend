import { Request, Response } from "express";
import { TreinoService } from "../services/treino/treino";

export class TreinoController {
  async createController(req: Request, res: Response) {
    const { user } = req.params;
    const treino = req.body;

    try {
      const treinoService = new TreinoService();

      await treinoService.createTreino({ ...treino, user });

      return res.status(201).send("Treino criado com sucesso!");
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ error: error.message });
    }
  }

  async addExercise(req: Request, res: Response) {
    const { treino, user } = req.params;
    const { exercicios } = req.body;

    try {
      const treinoService = new TreinoService();

      await treinoService.addNewExercice(user, Number(treino), exercicios);

      return res.status(201).send("Exercício adicionado com sucesso!");
    } catch (err) {
      if (err instanceof Error)
        return res.status(500).json({ error: err.message });
    }
  }
}
