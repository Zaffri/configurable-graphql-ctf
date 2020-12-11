import knex from "../../db";
import config from "../../config.json";

interface AuthenticateAdminArguments {
    email: string,
    password: string
}

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

export default {
    Mutation: {
        authenticateAdmin: async (obj: undefined, args: AuthenticateAdminArguments): Promise<AuthenticateAdminResponse> => {
            try {
                const user: DbUser = await knex.columns(["user_id", "email"])
                    .select()
                    .from("users")
                    .whereRaw(`email="${args.email}" AND password="${args.password}"`)
                    .first();

                console.log(user);

                if(user) {
                    return {
                        user: {
                            userId: user.user_id,
                            email: args.email
                        },
                        token: `Congrats! ${config.flag}`
                    };
                } else {
                    throw new Error("Email or password is incorrect.");
                }
            } catch(e) {
                throw new Error(e);
            }
        }
    }
};