import { Request, Response,NextFunction } from "express";
import { User } from "../Model/user.model";
import mysqlDataSource from "@root/db/db.connection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "@root/Middlewares/errorHandler.middleware";
import { UserMapper } from "../Mapper/user.mapper";
const userRepository = mysqlDataSource.getRepository(User);

export const signUp = async (req: Request, res: Response,next: NextFunction) => {
    const { name, email, password, role } = req.body;
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        return next(new AppError("User already exists with this email", 400));
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.role = role;

    await userRepository.save(user);

    // Return the created user in the response
    res.status(201).json({ user });
};

export const loginUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {

            return next(new AppError("User doesn't exists", 400));
        }

        // Hash the password before saving
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return next(new AppError("Please check you email and password", 400));
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "your_secret_key", // Replace with your actual secret key
            { expiresIn: "1d" } // Token expiration time
        );
        const { password: _, ...userWithoutPassword } = user;
        // Cookie options
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day expiration
            httpOnly: true, // Prevent client-side JavaScript access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        };

        // Send response
        res.status(200)
            .cookie("token", token, options)
            .json({ success: true, message: "Login successful", token, user:userWithoutPassword });
        // return;
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Server error, please try again later",
        });
    }
};
export const getUsers = async(req:Request,res:Response,next:NextFunction) => {
    const users = await userRepository.find();
    res.status(200)
            .json({ user: UserMapper.toResponseList(users)});
}
