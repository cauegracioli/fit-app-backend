import express from "express";
import { prisma } from "./database/prisma";

const app = express();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
