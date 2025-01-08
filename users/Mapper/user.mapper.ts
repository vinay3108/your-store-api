// src/User/mappers/user.mapper.ts

import { User } from '@root/Model/user.model'
import { UserResponse, CreateUserRequest } from "@root/DTO/user.dto";

export class UserMapper {
    static toResponse(user: User): UserResponse {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || "member",
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
    static toResponseList(users: User[]): UserResponse[] {
        return users.map((user) => this.toResponse(user));
    }

    static toEntity(dto: CreateUserRequest): User {
        const user = new User();
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password; // Ensure password is hashed before saving
        user.role = dto.role || "member";
        return user;
    }
}
