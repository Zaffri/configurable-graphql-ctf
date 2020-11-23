import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getDocuments(filterPrivateDocuments: Boolean): [Document]
    }

    extend type Mutation {
        registerNewUser(email: String!, password: String!): User
        authenticateUser(email: String!, password: String!): AuthenticationResponse
    }

    extend type User {
        email: String
    }

    type Document {
        name: String!
        fileContents: String!
    }

    type AuthenticationResponse {
        user: User
        token: String
    }
`;