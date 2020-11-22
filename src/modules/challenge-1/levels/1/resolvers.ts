export default {
    Query: {
        getUserByEmail: (obj, args, context) => {
            console.log("test");
            return {
                userId: args.email,
                email: "john@test.com",
                forename: "john",
                surname: "doe"
            };
        } 
    },
    Mutation: {
        updateProduct: (obj, args, context) => {
            return {
                userId: args.id,
                email: "update email",
                forename: "test",
                surname: "testing"
            };
        }
    }
};