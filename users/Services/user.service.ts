import { User } from "@root/Model/users.model";
import AppDataSource  from "@root/DB/db.connection";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new Error("User not found");
        return user;
    }

    async updateUser(id: number, full_name?: string, phone?: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new Error("User not found");

        if (full_name) user.full_name = full_name;
        if (phone) user.phone = phone;
        user.updated_at = new Date();

        await this.userRepository.save(user);
        return user;
    }
}
