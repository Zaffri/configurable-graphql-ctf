import { IExecutableSchemaDefinition } from "apollo-server-express";
import { DocumentNode } from "graphql";
import Challenge from "./Challenge";

export default class SchemaBuilder {
    private modules: Challenge[] = [];
    private moduleSchemas: DocumentNode[] = [];
    private moduleResolvers: Record<string, unknown>[] = [];
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

    public getSchema(): IExecutableSchemaDefinition {
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

    private stitchResolvers(moduleResolvers: Record<string, unknown>[]) {
        if(!moduleResolvers.length) return {};

        let combinedResolvers: {[key: string]: any} = {};

        moduleResolvers.forEach((res) => {
            const resolver: {[key: string]: any} = res.default;
            const resolverKeys: string[] = Object.keys(resolver);
            
            resolverKeys.forEach(resolverKey => {
                const combinedResolversKeys: string[] = Object.keys(combinedResolvers);

                if(combinedResolversKeys.includes(resolverKey)) {
                    const mergedResolvers = { ...combinedResolvers[resolverKey], ...resolver[resolverKey] };
                    combinedResolvers[resolverKey] = mergedResolvers;
                } else {
                    console.log(resolverKey + " not included");
                    combinedResolvers[resolverKey] = resolver[resolverKey];
                }
            });
        });
        this.stitchedModuleResolvers = combinedResolvers;
    }

    public setCoreSchemaAndResolvers(schema: DocumentNode, resolvers: Record<string, unknown>): void {
        this.moduleSchemas.push(schema);
        this.moduleResolvers.push({ default: resolvers });
    }
}