import { gql } from "apollo-server-express";

module.exports = gql`
    extend type Query {
        getOrdersByUser(userId: Int!): [Order]
        getUserById(userId: Int!): User
    }

    type Order { 
        orderId: Int
        orderNote: String
        totalCost: Float
    }

    extend type User {
        orders: [Order]
    }
`;