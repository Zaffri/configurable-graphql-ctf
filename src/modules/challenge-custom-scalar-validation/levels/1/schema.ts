import { gql } from "apollo-server-express";

module.exports = gql`
    scalar ResetPasswordPayload

    extend type Mutation {
        resetCustomerPassword(payload: ResetPasswordPayload!): ResetCustomerPasswordResponse
    }

    type ResetCustomerPasswordResponse {
        result: String
        debug: String
    }
`;