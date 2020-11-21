import { gql } from "apollo-server-express";

module.exports = gql`
    extend type User {
        staffNotes: string
    }
`;