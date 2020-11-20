import { gql } from "apollo-server-express";

export default gql`
    type Query {
        getUserById(id: Int!): User
    }

    type User {
        userId: String
        email: String
        forename: String
        surname: String
    }
`;