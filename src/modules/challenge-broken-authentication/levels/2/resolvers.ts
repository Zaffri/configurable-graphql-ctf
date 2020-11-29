import jwt from "jsonwebtoken";
import { Document, GetDocumentsArguments } from "../../module-types";
import data from "../../module-data";

const appSecret = "1234"; // pull from module location or add feature to module for confguring secrets?

type AuthenticateUserArguments = {
    email: string,
    password: string
}

const isUserAdmin = (context: any): boolean => {
    console.log("context: " + JSON.stringify(context));
    if(context && context.user && context.user.isAdmin) {
        return true;
    } else {
        return false;
    }
};

export default {
    Query: {
        getDocuments: (obj: undefined, args: GetDocumentsArguments, context: any): Document[] => {
            if(!args.filterByPrivateDocuments) {
                return data.documents.filter((document) => !document.private);
            } else {
                if(isUserAdmin(context)) {
                    console.log("IS ADMIN!");
                    return data.documents.filter((document) => document.private);
                } else {
                    console.log("NOT ADMIN!");
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
        authenticateUser: (obj: undefined, args: AuthenticateUserArguments, context: any): Record<string, unknown> => {
            const email = args.email;
            const password = args.password;

            // Hard coded for testing purpose - add in db later
            if(email === "steven@graphql.ctf" && password === "password") {
                const tokenPayload = { user: { email: args.email, isAdmin: false } };
                const token = jwt.sign(tokenPayload, appSecret, { algorithm: "none" });

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