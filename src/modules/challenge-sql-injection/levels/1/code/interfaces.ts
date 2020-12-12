import { AuthenticateUser } from "../../../../../shared/sharedInterfaces";

interface AuthenticateAdminResponse {
    user: {
        userId: number,
        email: string
    }
    token: string
}

interface DbUser {
    user_id: number,
    email: string
}

export {
    AuthenticateUser,
    AuthenticateAdminResponse,
    DbUser
};