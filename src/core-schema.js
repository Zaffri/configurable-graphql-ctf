const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        getUserById(id: Int!): User
    }
    
    type Mutation

    type User
`;