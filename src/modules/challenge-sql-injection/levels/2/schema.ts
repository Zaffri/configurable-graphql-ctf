import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getProductsByCategory(categoryName: String!): [Product]
    }

    extend type Product {
        categoryId: Int 
        description: String
    }
`;