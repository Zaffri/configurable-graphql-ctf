const { gql } = require('apollo-server-express');

module.exports = {
    Query: {
        getUserById: (obj, args, context) => {
            console.log("TEST")
            return {
                userId: args.id,
                email: "steven@test.com",
                forename: "steven",
                surname: "morrison"
            };
        }
    }
}