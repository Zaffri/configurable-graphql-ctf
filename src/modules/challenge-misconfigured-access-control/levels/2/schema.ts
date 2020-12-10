import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getUsers: [User]
    }

    extend type Mutation {
        updateProduct(productId: Int!, cost: Float!, apiToken: String): UpdateProductResponse
    }

    extend type User {
        apiToken: String!
        isAdmin: Boolean!
    }

    extend type Product {
        cost: Float!
    }

    type UpdateProductResponse {
        product: Product!
        successMessage: String
    }
`;