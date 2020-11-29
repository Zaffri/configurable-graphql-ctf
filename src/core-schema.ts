import { gql } from "apollo-server-express";

export default gql`
    type Query {
        getUserByEmail(email: String!): User
    }

    type User {
        userId: Int
    }

    type Mutation {
        updateProfile(id: Int!): User
    }
`;