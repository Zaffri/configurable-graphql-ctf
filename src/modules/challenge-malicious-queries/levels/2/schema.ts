import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getProducts(page:Int, pageSize:Int): [Product]
    }

    extend type Product {
        categories: [Category]
    }

    type Category {
        categoryId: Int!,
        name: String,
        products: [Product]
    }
`;