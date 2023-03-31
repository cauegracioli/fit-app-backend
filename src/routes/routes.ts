import express from "express";

import { perfilCreateController } from "../controllers/perfil";
import UserController from "../controllers/user";
import { TreinoController } from "../controllers/treino";

const routes = express.Router();

const userController = new UserController();
const treinoController = new TreinoController();

routes.post("/user", userController.create);

routes.delete("/user", userController.delete);

routes.post("/login", userController.login);

routes.post("/perfil/:id", perfilCreateController);

routes.post("/treino/:user", treinoController.createController);

export default routes;
