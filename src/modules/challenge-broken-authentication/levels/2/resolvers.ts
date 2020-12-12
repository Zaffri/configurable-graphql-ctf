import jwt from "jsonwebtoken";
import { AuthenticateUser, Document } from "./code/interfaces";
import data from "../../module-data";

const appSecret = "1234"; // pull from module location or add feature to module for confguring secrets?

const isUserAdmin = (context: any): boolean => {
    console.log(context);
    if(context && context.user && context.user.isAdmin) {
        return true;
    } else {
        return false;
    }
};

export default {
    Query: {
        getDocuments: (obj: undefined, args: { filterByPrivateDocuments: boolean }, context: any): Document[] => {
            if(!args.filterByPrivateDocuments) {
                return data.documents.filter((document) => !document.private);
            } else {
                if(isUserAdmin(context)) {
                    return data.documents.filter((document) => document.private);
                } else {
                    throw new Error("Only logged in staff members can access private documents");
                }
            }
        }
    },
    Mutation: {
        registerNewUser: (obj: undefined, args: any, context: any): Record<string, unknown> => {
            return {
                userId: 1,
                email: args.email
            };
        },
        authenticateUser: (obj: undefined, args: AuthenticateUser, context: any): Record<string, unknown> => {
            const email = args.email;
            const password = args.password;

            if(email === "steven@graphql.ctf" && password === "password") {
                const tokenPayload = { user: { email: args.email, isAdmin: false } };
                const token = jwt.sign(tokenPayload, appSecret, { algorithm: "HS256" });

                return {
                    user: {
                        userId: 1,
                        email: args.email
                    },
                    token: token
                };
            } else {
                throw new Error("Email or password is incorrect!");
            }
        }
    }
};