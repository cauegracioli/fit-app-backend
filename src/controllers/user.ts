import { Response } from "express";
import { Request } from "express";
import UserCreateService from "../services/user";
import UserDeleteService from "../services/userDelete";
class UserController {
  async create(req: Request, res: Response) {
    const user = req.body;

    try {
      const userService = new UserCreateService();

      const userResponse = await userService.create(user);
      delete userResponse.password;

      return res.status(200).send(userResponse);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;
    const deleteService = new UserDeleteService();
    try {
      const deleted = await deleteService.delete(id);

      return res.status(200).send(deleted);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default UserController;
