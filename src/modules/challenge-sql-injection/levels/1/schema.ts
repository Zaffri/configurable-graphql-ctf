import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Mutation {
        authenticateAdmin(email: String!, password: String): AuthenticateAdminResponse
    }

    type AuthenticateAdminResponse {
        user: User
        token: String
    }
`;