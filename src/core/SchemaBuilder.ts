import ApolloSchema from "./interfaces/ApolloSchema";
import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";
import Challenge from "./Challenge";
import Fs from "fs";

export default class SchemaBuilder {
    private modules: Challenge[] = [];
    private moduleSchemas: DocumentNode[] = [];
    private moduleResolvers = {}
    private defaultResolverFileName = "resolvers";
    private defaultSchemaFileName = "schema.graphql";

    constructor(enabledModules: Challenge[]) {
        this.modules = enabledModules;
    }

    public generateSchema() {
        this.modules.forEach((module) => {
            // console.log(module.getModuleFolder());
            // call method to populate moduleSchemas array
            this.prepareModuleSchema(module);
            // call method to stitch resolvers

        });
    }

    public getSchema(): ApolloSchema {
        if(this.moduleSchemas.length < 1 || !this.moduleResolvers) {
            throw new Error("Your enabled challenge modules cannot have no schemas or resolvers defined.");
        } else {
            return {
                typeDefs: this.moduleSchemas,
                resolvers: this.moduleResolvers
            };
        }
    }

    private prepareModuleSchema(module: Challenge) {
        const moduleSchemaPath: string = module.getModuleFolder() + this.defaultSchemaFileName;
        console.log(moduleSchemaPath);
        const moduleSchema = gql(Fs.readFileSync(moduleSchemaPath, "utf8"));
        console.log(moduleSchema);
        this.moduleSchemas.push(moduleSchema);
    }
}