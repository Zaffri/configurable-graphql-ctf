import ApolloSchema from "./interfaces/ApolloSchema";
import Challenge from "./Challenge";

export default class SchemaBuilder {
    private modules: Challenge[] = [];
    private moduleSchemas = [];
    private moduleResolvers = {}
    private defaultResolverFileName = "resolvers";

    constructor(enabledModules: Challenge[]) {
        this.modules = enabledModules;
    }

    public generateSchema() {
        this.modules.forEach((module) => {
            console.log(module.getModuleFolder());
            // call method to populate moduleSchemas array

            // call method to stitch resolvers

        });
    }

    public getSchema(): ApolloSchema {
        if(this.moduleSchemas.length < 1 || !this.moduleResolvers) {
            throw new Error("The API cannot run as there are no schema or resolvers defined in your modules.");
        } else {
            return {
                typeDefs: this.moduleSchemas,
                resolvers: this.moduleResolvers
            };
        }
    }
}