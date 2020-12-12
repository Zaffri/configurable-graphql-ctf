import { ApolloServer, makeExecutableSchema, Config, IExecutableSchemaDefinition } from "apollo-server-express";
import Express, { Application } from "express";
import dotenv from "dotenv";
import Helpers from "./core/Helpers";

dotenv.config();
Helpers.setBaseProjectPath(__dirname);

import sharedResolvers from "./shared/sharedResolvers.js";
import sharedSchema from "./shared/sharedSchema.js";

import ChallengeList from "./modules/challenge-list.json";
import Configuration from "./core/Configuration";
import Context from "./core/Context";
import SchemaBuilder from "./core/SchemaBuilder";
import ValidationRules from "./core/ValidationRules";

const configuration = new Configuration(ChallengeList);
const enabledChallenges = configuration.getEnabledChallenges();
const modulesExtendingContext = configuration.getModulesThatExtendContext();
const modulesExtendingValidationRules = configuration.getModulesThatExtendValidationRules();

const init = async() => {
    const schemaBuilder = new SchemaBuilder(enabledChallenges);
    schemaBuilder.setSharedSchemaAndResolvers(sharedSchema, sharedResolvers);
    await schemaBuilder.generateSchema();

    const schema: IExecutableSchemaDefinition = schemaBuilder.getSchema();
    console.log(schema);
    const serverConfig: Config = {
        schema: makeExecutableSchema(schema)
    };

    if(modulesExtendingContext.length) {
        const context = new Context(modulesExtendingContext);
        serverConfig.context = async ({ req }) => await context.getContext(req);
    }

    if(modulesExtendingValidationRules.length) {
        const validationRules = new ValidationRules(modulesExtendingValidationRules);
        serverConfig.validationRules = await validationRules.getValidationRules();
    }

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