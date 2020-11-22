import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getUsersByForename(surname: String!): [User]
    }
    extend type User {
        teams: [Team]
    }
    type Team {
        teamId: Int!
        name: String!
    }
`;