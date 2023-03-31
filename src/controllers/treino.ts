import { Request, Response } from "express";
import { TreinoService } from "../services/treino/createTreino";

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
}
