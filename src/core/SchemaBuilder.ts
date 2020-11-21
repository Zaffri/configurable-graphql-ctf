import ApolloSchema from "./interfaces/ApolloSchema";
import { DocumentNode } from "graphql";
import Challenge from "./Challenge";

export default class SchemaBuilder {
    private modules: Challenge[] = [];
    private moduleSchemas: DocumentNode[] = [];
    private moduleResolvers: DocumentNode[] = [];
    private stitchedModuleResolvers = {}

    private defaultResolverFileName = "resolvers.js";
    private defaultSchemaFileName = "schema.js";

    constructor(enabledModules: Challenge[]) {
        this.modules = enabledModules;
    }

    public async generateSchema(): Promise<void> {
        for(let x = 0; x<this.modules.length; x++) {
            const currentModule = this.modules[x];
            await this.prepareModuleSchemaAndResolvers(currentModule);
        }
        this.stitchResolvers(this.moduleResolvers);
    }

    public getSchema(): ApolloSchema {
        if(this.moduleSchemas.length < 1 || !this.moduleResolvers) {
            throw new Error("Your enabled challenge modules cannot have no schemas or resolvers defined.");
        } else {
            return {
                typeDefs: this.moduleSchemas,
                resolvers: this.stitchedModuleResolvers
            };
        }
    }

    private async prepareModuleSchemaAndResolvers(module: Challenge) {
        const modulePath: string = module.getModuleFolder();
        const schema = await import(modulePath + this.defaultSchemaFileName);
        const resolvers = await import(modulePath + this.defaultResolverFileName);

        this.moduleSchemas.push(schema);
        this.moduleResolvers.push(resolvers);
    }

    private stitchResolvers(moduleResolvers: DocumentNode[]) {
        if(!moduleResolvers.length) return {};

        const combinedResolvers = { Query: {} };

        moduleResolvers.forEach((res) => {
            const resolver = res.default;
            for(const prop in resolver) {
                if(combinedResolvers[prop]) {
                    // Prop Exists - merge
                    const newPropValue = { ...combinedResolvers[prop], ...resolver[prop] };
                    combinedResolvers[prop] = newPropValue;
                } else {
                    // Does not exist - add new prop
                    combinedResolvers[prop] = resolver[prop];
                }
            }
        });
        this.stitchedModuleResolvers = combinedResolvers;
    }

    public setCoreSchemaAndResolvers(schema: DocumentNode, resolvers: DocumentNode): void {
        this.moduleSchemas.push(schema);
        this.moduleResolvers.push({ default: resolvers });
    }
}