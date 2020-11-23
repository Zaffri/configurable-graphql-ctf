import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getDocuments(filterPrivateDocuments: Boolean): [Document]
        getDocumentsByCategories(categoryName: String!): [Document]
        listDocumentCategories: [Category]
    }

    type Document {
        name: String!
        fileContents: String!
    }

    type Category {
        name: String!
        description: String!
    }
`;