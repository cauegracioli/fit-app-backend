import express from "express";
import UserController from "../controllers/user";

const routes = express.Router();

const userController = new UserController();

routes.post("/user", userController.create);

routes.delete("/user", userController.delete);

export default routes;
