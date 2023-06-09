import { Request, Response } from "express";
import prisma from "../database/prisma";
import Login from "../services/login";
import UserCreateService from "../services/user/user";
import UserDeleteService from "../services/user/userDelete";
import { GetAllUserData } from "../services/user/getAllUserData";
class UserController {
  async create(req: Request, res: Response) {
    const user = req.body;

    try {
      const userService = new UserCreateService();

      const userResponse = await userService.createUser(user);
      userResponse.password = "";

      return res.status(200).send(userResponse);
    } catch (err) {
      if (err instanceof Error)
        return res.status(500).json({ error: err.message });
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;
    const deleteService = new UserDeleteService();
    try {
      const deleted = await deleteService.delete(id);

      return res.status(200).send(deleted);
    } catch (err) {
      if (err instanceof Error)
        return res.status(500).json({ error: err.message });
    } finally {
      await prisma.$disconnect();
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const userLogin = new Login();

    try {
      const response = await userLogin.login(username, password);

      return res.json(response);
    } catch (err) {
      if (err instanceof Error)
        return res.status(500).json({ error: err.message });
    } finally {
      await prisma.$disconnect();
    }
  }

  async findUserData(req: Request, res: Response) {
    const { username } = req.params;

    try {
      const findUserData = new GetAllUserData();

      const userData = await findUserData.findAllUserDataService(username);

      if (userData) {
        return res.status(200).json(userData);
      } else {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (err) {
      if (err instanceof Error)
        return res.status(500).json({ error: err.message });
    }
  }
}

export default UserController;
