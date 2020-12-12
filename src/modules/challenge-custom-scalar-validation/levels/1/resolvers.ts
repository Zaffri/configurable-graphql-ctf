import JSONString from "./code/JSONString";
import MongoDbConnection from "../../MongoDbConnection";
import { MongoClient } from "mongodb";
import config from "../../config.json";
import { ResetCustomerPasswordArguments, ResetCustomerPasswordResponse, resetPasswordRequestResult } from "./code/interfaces";

const host = process.env.MONGO_HOST || null;
const port = parseInt(process.env.MONGO_PORT) || null;
const dbName = process.env.MONGO_DB_NAME || null;
const user = process.env.MONGO_DB_USER || null;
const pass = process.env.MONGO_DB_PASS || null;

const passwordReset = (client: MongoClient, userId: number, resetToken: any): Promise<resetPasswordRequestResult[]> => {
    const db = client.db("dbtest");

    return new Promise((resolve, reject) => {
        db.collection("password_reset_requests")
            .find({user_id: userId, reset_token: resetToken})
            .limit(1)
            .toArray(function(err, data) {
                if(err) {
                    console.log("Fail - " + err);
                    reject(err);
                }   else {
                    console.log(JSON.stringify(data));
                    resolve(data);
                }
            });
    });
};

export default {
    Mutation: {
        resetCustomerPassword: async (obj: undefined, args: ResetCustomerPasswordArguments): Promise<ResetCustomerPasswordResponse> => {
            const payload = args.payload;

            const mongoConnection = new MongoDbConnection(host, port, dbName, user, pass);
            const client = await mongoConnection.getMongoClient();

            if(!payload.resetToken || !payload.userId) {
                throw new Error("A reset token and userId must be supplied!");
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
    JSONString
};