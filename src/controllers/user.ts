import { Response } from "express";
import { Request } from "express";
import UserCreateService from "../services/user";
class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = req.body;

      const userService = new UserCreateService();

      const userResponse = await userService.create(user);
      delete userResponse.password;

      return res.status(200).send(userResponse);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default UserController;
