export interface RegisterResponse {
    message: string;
    user: {
        avatar: string;
        username: string;
        email: string;
    };
}