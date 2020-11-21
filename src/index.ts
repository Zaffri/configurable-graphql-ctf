import { ApolloServer, makeExecutableSchema, Config, IExecutableSchemaDefinition } from "apollo-server-express";
import Express, { Application } from "express";

import coreResolvers from "./core-resolvers.js";
import coreSchema from "./core-schema.js";

import ChallengeList from "./modules/challenge-list.json";
import Configuration from "./core/Configuration";
import SchemaBuilder from "./core/SchemaBuilder";

const configuration = new Configuration(ChallengeList);
const enabledChallenges = configuration.getEnabledChallenges();

const init = async() => {
    const schemaBuilder = new SchemaBuilder(enabledChallenges);
    schemaBuilder.setCoreSchemaAndResolvers(coreSchema, coreResolvers);
    await schemaBuilder.generateSchema();

    const schema: IExecutableSchemaDefinition = schemaBuilder.getSchema();
    console.log(schema);
    const serverConfig: Config = {
        schema: makeExecutableSchema(schema)
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
};

init().catch((err) => {
    console.log(err);
});