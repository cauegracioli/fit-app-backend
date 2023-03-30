import { z } from "zod";
import { UserRepository } from "../../repositories/user";

class UserDeleteService {
  async delete(id: string) {
    const userRepo = new UserRepository();
    const userSchema = z.number();

    const validate = userSchema.safeParse(id);

    if (!validate.success) {
      return { success: false, error: "O ID do usuário deve ser um número" };
    }

    const deleted = await userRepo.delete(id);
    deleted.password = "";

    return deleted;
  }
}

export default UserDeleteService;
