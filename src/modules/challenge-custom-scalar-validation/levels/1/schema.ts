import { gql } from "apollo-server-express";

module.exports = gql`
    scalar JSONString

    extend type Mutation {
        resetCustomerPassword(payload: JSONString!): ResetCustomerPasswordResponse
    }

    type ResetCustomerPasswordResponse {
        successMessage: String
        debug: String
    }
`;