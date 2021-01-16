import { GraphQLScalarType, Kind } from "graphql";

export default new GraphQLScalarType({
    name: "ResetPasswordPayload",
    description: "A string containing password reset fields which is parsed as JSON.",
    parseValue(value) {
        const typeErrorMessage = "Payload must be a string of JSON.";
        if(typeof(value) !== "string") throw new Error(typeErrorMessage);

        try {
            const parsed = JSON.parse(value);
            return parsed;
        }   catch(err) {
            throw new Error(typeErrorMessage);
        }
    },
    parseLiteral(ast) {
        const typeErrorMessage = "Payload must be a string of JSON.";
        if(ast.kind !== Kind.STRING) throw new Error(typeErrorMessage);

        try {
            const parsed = JSON.parse(ast.value);
            return parsed;
        }   catch(err) {
            throw new Error(typeErrorMessage);
        }
    }
});