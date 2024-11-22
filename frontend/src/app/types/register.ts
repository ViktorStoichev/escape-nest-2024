export interface RegisterResponse {
    message: string;
    user: {
        username: string;
        email: string;
    };
}