module.exports = {
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
    }
};