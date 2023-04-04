import express from "express";

import { perfilCreateController } from "../controllers/perfil";
import UserController from "../controllers/user";
import { TreinoController } from "../controllers/treino";
import { infoCreateController } from "../controllers/info";

const routes = express.Router();

const userController = new UserController();
const treinoController = new TreinoController();

routes.post("/user", userController.create);

routes.delete("/user", userController.delete);

routes.post("/login", userController.login);

routes.post("/perfil/:id", perfilCreateController);

routes.post("/treino/:user", treinoController.createController);

routes.post("/treino/exercicio/:user/:treino", treinoController.addExercise);

routes.post("/user/info/:user", infoCreateController);

routes.get("/:username", userController.findUserData);

export default routes;
