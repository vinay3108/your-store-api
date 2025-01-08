export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role?: string; // Optional because it has a default value
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}