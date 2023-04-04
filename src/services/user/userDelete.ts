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

    try {
      const deleted = await userRepo.delete(id);
      deleted.password = "";

      return deleted;
    } catch (error) {
      throw new Error("Ocorreu um erro ao tentar excluir o usuário");
    }
  }
}

export default UserDeleteService;
