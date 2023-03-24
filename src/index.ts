const express = require("express");
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const routes = express.Router();

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Rota funcionando");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
