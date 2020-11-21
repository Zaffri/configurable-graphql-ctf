import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getUserByEmail(email: String!): User
    }
    extend type User {
        forename: String,
        surname: String
    }
    extend type Mutation {
        updateProfile(id: Int!): User
    }
`;