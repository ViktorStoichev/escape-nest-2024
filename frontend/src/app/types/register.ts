export interface RegisterResponse {
    message: string;
    user: {
        _id: string,
        avatar: string;
        username: string;
        email: string;
    };
}

export interface UserProfile {
    avatar: string,
    username: string,
    email: string
}