export interface User {
    _id: string;
    avatar: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRegisterResponse {
    user: User;
    token: string;
}

export interface UserDataResponse {
    _id: string;
    avatar: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}