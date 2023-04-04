import { Request, Response } from "express";
import { createInfo } from "../services/info";

export async function infoCreateController(req: Request, res: Response) {
  const { user } = req.params;
  const { peso, porcentagem } = req.body;

  try {
    const info = await createInfo(peso, porcentagem, user);

    return res.status(201).json(info);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message);
    }
  }
}
