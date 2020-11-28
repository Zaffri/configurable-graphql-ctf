import { Document, GetDocumentsArguments } from "../../module-types";
import data from "../../module-data";

export default {
    Query: {
        getDocuments: (obj: undefined, args: GetDocumentsArguments, context: any): Document[] => {
            console.log(context);
            if(!args.filterByPrivateDocuments) {
                return data.documents.filter((document) => !document.private);
            } else {
                throw new Error("Only logged in staff members can access private documents");
            }
        }
    },
    Mutation: {
        registerNewUser: (obj, args, context): Record<string, unknown> => {
            return {
                userId: 1,
                email: args.email
            };
        },
        authenticateUser: (obj, args, context): Record<string, unknown> => {
            return {
                user: {
                    userId: 1,
                    email: args.email
                },
                token: "My token"
            };
        }
    }
};