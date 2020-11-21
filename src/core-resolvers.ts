export default {
    Query: {
        getUserById: (obj, args, context) => {
            console.log("TEST");
            return {
                userId: args.id,
                email: "steven@test.com",
                forename: "steven",
                surname: "morrison"
            };
        }
    },
    Mutation: {
        updateProfile(obj, args, context) {
            return {
                userId: args.id,
                email: "steven@test.com",
                forename: "steven",
                surname: "morrison"
            };
        }
    } 
};