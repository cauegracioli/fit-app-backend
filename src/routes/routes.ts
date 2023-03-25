import express from "express";
import { perfilCreateController } from "../controllers/perfil";
import UserController from "../controllers/user";

const routes = express.Router();

const userController = new UserController();

routes.post("/user", userController.create);

routes.delete("/user", userController.delete);

routes.post("/login", userController.login);

routes.post("/perfil/:id", perfilCreateController);

export default routes;
