import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getProducts(page:Int, pageSize:Int): [Product]
    }
`;