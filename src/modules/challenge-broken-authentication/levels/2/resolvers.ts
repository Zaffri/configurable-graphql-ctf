export default {
    Query: {
        getDocuments: (obj, args, context): Record<string, unknown>[] => {
            return [
                {
                    name: "Document 3",
                    fileContents: "Some contents for doc 3."
                },
                {
                    name: "Document 4",
                    fileContents: "Some contents for doc 4."
                }
            ];
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