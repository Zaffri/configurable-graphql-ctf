import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getUsers: [User]
    }

    extend type Mutation {
        updateProduct(productId: Int!, cost: Float!, apiToken: String): UpdateProductResponse
    }

    extend type User {
        email: String!
        apiToken: String!
        isAdmin: Boolean!
    }

    type Product {
        productId: Int!
        name: String!
        cost: Float!
    }

    type UpdateProductResponse {
        product: Product!
        successMessage: String
    }
`;