const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server-express');

const Express = require('express'); 

const schemaBuilder = require('./schema-builder.js');

const coreResolvers = require('./core-resolvers.js');
const coreSchema = require('./core-schema.js');
const challengeOneSchema = require('./modules/challenge-1/schema.js');
const challengeOneResolvers = require('./modules/challenge-1/resolvers.js');
const challengeTwoSchema = require('./modules/challenge-2/schema.js');
const challengeTwoResolvers = require('./modules/challenge-2/resolvers.js');

const allResolvers = [coreResolvers, challengeOneResolvers, challengeTwoResolvers]

// Add some safe guards for GraphQL 
// - add check to see if modules define no resolvers

const server = new ApolloServer({
    schema: makeExecutableSchema({
        typeDefs: [
            coreSchema,
            ...[ challengeOneSchema, challengeTwoSchema ]
        ],
        resolvers: {
            Query: {},
            ...schemaBuilder.stitchResolvers(allResolvers)
        }
    })
});

console.log(schemaBuilder.stitchResolvers(allResolvers))

const app = Express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
