import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getUsers: [User]
    }

    extend type Mutation {
        updateProduct(productId: Int!, price: Float!, apiToken: String): UpdateProductResponse
    }

    extend type User {
        apiToken: String
        isAdmin: Boolean
    }

    type UpdateProductResponse {
        product: Product!
        successMessage: String
    }
`;