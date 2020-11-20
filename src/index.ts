import { ApolloServer, makeExecutableSchema, Config } from "apollo-server-express";
import Express, { Application } from "express";

import coreResolvers from "./core-resolvers.js";
import coreSchema from "./core-schema.js";

import ApolloSchema from "./core/interfaces/ApolloSchema";
import ChallengeList from "./modules/challenge-list.json";
import Configuration from "./core/Configuration";
import SchemaBuilder from "./core/SchemaBuilder";

const configuration = new Configuration(ChallengeList);
const enabledChallenges = configuration.getEnabledChallenges();

// console.log(enabledChallenges);

const schemaBuilder = new SchemaBuilder(enabledChallenges);
schemaBuilder.generateSchema();
const schema: ApolloSchema = schemaBuilder.getSchema();

const serverConfig: Config = {
    schema: makeExecutableSchema(schema)
    // schema: makeExecutableSchema({
    //     typeDefs: [
    //         coreSchema
    //     ],
    //     resolvers: coreResolvers
    // })
};

const server: ApolloServer = new ApolloServer(serverConfig);

const app: Application = Express();

server.applyMiddleware({
    app,
    path: "/graphql"
});

app.listen({ port: 4000 }, () =>
    console.log("🚀 Server ready at http://localhost:4000/graphql")
);
