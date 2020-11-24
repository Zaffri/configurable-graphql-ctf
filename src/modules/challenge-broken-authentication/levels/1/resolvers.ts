import data from "./data";

interface Document {
    name: string,
    private: boolean,
    category: string,
    fileContents: string
}

interface Category {
    name: string,
    private: boolean,
    description: string
}

export default {
    Query: {
        getDocuments: (obj: undefined, args, context): Document[] => {
            if(!args.filterByPrivateDocuments) {
                return data.documents.filter((document) => !document.private);
            } else {
                throw new Error("Only logged in staff members can access private documents");
            }
        },
        getDocumentsByCategory: (obj: undefined, args, context): Document[] => {
            const categoryInput = args.categoryName.toLowerCase();
            const documentsByCategory: Document[] = data.documents.filter((document) => document.category.toLowerCase() === categoryInput);

            if(!documentsByCategory.length) throw new Error(`Cannot find any documents for category: ${categoryInput}`);
            return documentsByCategory;
        },
        listDocumentCategories: (): Category[] => {
            return data.categories;
        }
    }
};