import { gql } from "apollo-server-express";

export default gql`
    type Query {
        getUserByEmail(email: String!): User
    }

    type Mutation {
        updateProfile(id: Int!): User
    }

    type User {
        userId: Int
        email: String
    }

    type Product {
        productId: Int!
        name: String!
        price: Float!
    }

    type Category {
        name: String!
    }
`;