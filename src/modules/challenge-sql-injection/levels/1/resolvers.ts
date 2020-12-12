import knex from "../../db";
import config from "../../config.json";
import { AuthenticateUser, AuthenticateAdminResponse, DbUser } from "./code/interfaces";

export default {
    Mutation: {
        authenticateAdmin: async (obj: undefined, args: AuthenticateUser): Promise<AuthenticateAdminResponse> => {
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