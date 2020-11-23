export default {
    Query: {
        getDocuments: (obj, args, context): Record<string, unknown>[] => {
            return [
                {
                    name: "Document 1",
                    fileContents: "Some contents for doc 1."
                },
                {
                    name: "Document 2",
                    fileContents: "Some contents for doc 2."
                }
            ];
        },
        getDocumentsByCategories: (obj, args, context): Record<string, unknown>[] => {
            return [
                {
                    name: "Document 1 - " + args.categoryName,
                    fileContents: "Some contents for doc 1."
                }
            ];
        },
        listDocumentCategories: (obj, args, context): Record<string, unknown>[] => {
            return [
                {
                    name: "Public category 1",
                    description: "Public documents"
                },
                {
                    name: "Staff Procedures",
                    description: "Internal staff documents"
                }
            ];
        }
    }
};