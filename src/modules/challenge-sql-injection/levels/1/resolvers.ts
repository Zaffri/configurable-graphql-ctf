import config from "../../config.json";

export default {
    Mutation: {
        authenticateAdmin: (obj: undefined, args) => {
            return {
                user: {
                    userId: 1,
                    email: args.email
                },
                token: "string"
            };
        }
    }
};