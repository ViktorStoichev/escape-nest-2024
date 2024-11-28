export interface User {
    _id: string;
    avatar: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
    message: string;
}