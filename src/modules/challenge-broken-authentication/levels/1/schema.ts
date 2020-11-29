import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getDocuments(filterByPrivateDocuments: Boolean): [Document]
        getDocumentsByCategory(categoryName: String!): [Document]
        listDocumentCategories: [Category]
    }

    type Document {
        name: String!
        private: Boolean!
        fileContents: String!
    }

    type Category {
        name: String!
        private: Boolean!
        description: String!
    }
`;