import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getDocuments(filterByPrivateDocuments: Boolean): [Document]
    }

    extend type Mutation {
        authenticateUser(email: String!, password: String!): AuthenticationResponse
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