import { UserRepository } from "../repositories/user";
const bcrypt = require("bcryptjs");
import * as jwt from "jsonwebtoken";
const auth = require("../config/auth.json");

class Login {
  async login(email: string, password: string) {
    const userRepo = new UserRepository();

    const user = await userRepo.findByEmail(email);

    if (!user) {
      throw new Error("Usuário ou senha incorretos");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Usuário ou senha incorretos");
    }

    user.password = "";

    const token = jwt.sign({ id: user.id }, auth.secret, {
      expiresIn: 86400,
    });

    return { user, token };
  }
}

export default Login;
