export default {
    Query: {
        getUserByEmail: (obj, args, context) => {
            console.log("TEST");
            return {
                userId: 1,
                email: args.email,
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