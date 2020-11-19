const { gql } = require('apollo-server-express');
module.exports = gql `
    extend type Query {
        getUsersBySurname(surname: String!): [User]
    }
    extend type User {
        email: String
        teams: [Team]
    }
    type Team {
        teamId: Int!
        name: String!
    }
`;
//# sourceMappingURL=schema.js.map