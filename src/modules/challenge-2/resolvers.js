const { gql } = require('apollo-server-express');

module.exports = {
    Query: {
        getUsersBySurname: (obj, args, context) => {
            return [
                {
                    userId: args.surname,
                    email: "jane@test.com",
                    forename: "jane",
                    surname: "doe"
                },
                {
                    userId: args.surname,
                    email: "john@test.com",
                    forename: "john",
                    surname: "doe"
                }
            ];
        } 
    },
    User: {
        teams: (obj, args, context) => {
            return [
                {
                    teamId: 1,
                    name: "team 1"
                },
                {
                    teamId: 2,
                    name: "team 2"
                }
            ];
        }
    }
}