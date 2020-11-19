const { gql } = require('apollo-server-express');

module.exports = {
    Query: {
        getUserByEmail: (obj, args, context) => {
            console.log("test")
            return {
                userId: args.email,
                email: "john@test.com",
                forename: "john",
                surname: "doe"
            };
        } 
    },
    Mutation: {
        updateProfile: (obj, args, context) => {
            return {
                userId: args.id,
                email: "update email",
                forename: "test",
                surname: "testing"
            };
        }
    }
};