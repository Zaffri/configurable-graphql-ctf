import ResetPasswordPayload from "./code/ResetPasswordPayload";
import MongoDbConnection from "../../MongoDbConnection";
import config from "../../config.json";
import { ResetCustomerPasswordArguments, ResetCustomerPasswordResponse, resetPasswordRequestResult } from "./code/interfaces";
import { passwordReset } from "./code/model";

const host = process.env.MONGO_HOST || null;
const port = parseInt(process.env.MONGO_PORT) || null;
const dbName = process.env.MONGO_DB_NAME || null;
const user = process.env.MONGO_DB_USER || null;
const pass = process.env.MONGO_DB_PASS || null;

export default {
    Mutation: {
        resetCustomerPassword: async (obj: undefined, args: ResetCustomerPasswordArguments): Promise<ResetCustomerPasswordResponse> => {
            const payload = args.payload;

            const mongoConnection = new MongoDbConnection(host, port, dbName, user, pass);
            const client = await mongoConnection.getMongoClient();

            if(!payload.resetToken || !payload.userId || !payload.newPassword) {
                throw new Error("The 'ResetPasswordPayload' requires the following fields; 'resetToken', 'userId' and 'newPassword'.");
            } else {
                const res: resetPasswordRequestResult[] = await passwordReset(client, payload.userId, payload.resetToken);

                if(!res.length) {
                    return {
                        result: "Token and/or user ID is not valid.",
                        debug: `QUERY: db.collection('password_reset_requests')
                        .find({user_id: ${payload.userId}, reset_token: ${JSON.stringify(payload.resetToken)}})....`
                    };
                } else {
                    return {
                        result: `Congrats! ${config.flag}`,
                        debug: `QUERY: db.collection('password_reset_requests')
                        .find({user_id: ${payload.userId}, reset_token: ${JSON.stringify(payload.resetToken)}})....`
                    };
                }
            }

        }
    },
    ResetPasswordPayload
};