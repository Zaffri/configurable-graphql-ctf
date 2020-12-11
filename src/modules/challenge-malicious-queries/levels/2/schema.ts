import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getProducts(page:Int, pageSize:Int): [Product]
    }

    extend type Product {
        categories: [Category]
    }

    extend type Category {
        categoryId: Int!,
        products: [Product]
    }
`;