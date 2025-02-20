import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppDataSource from "@root/DB/db.connection";
import { User } from "@root/Model/users.model";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const SALT_ROUNDS = 10;

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(
        email: string,
        password: string,
        full_name?: string,
        phone?: string
    ) {
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = this.userRepository.create({
            email,
            phone,
            password_hash,
            full_name,
        });

        await this.userRepository.save(newUser);

        return { id: newUser.id, email: newUser.email };
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "1h",
        });

        return { token };
    }

    async verifyToken(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }
}
