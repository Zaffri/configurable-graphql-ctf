import { DocumentNode } from "graphql";
interface ApolloSchema {
    typeDefs: DocumentNode[],
    resolvers: unknown
}

export default ApolloSchema;